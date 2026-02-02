import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Simulacion } from '@prisma/client';
import { SimulacionRepository, CreateSimulacionData } from './simulacion.repository';
import { UsuarioService } from '../usuario/usuario.service';
import {
  SimulacionRequestDto,
  SimulacionResponseDto,
  SimulacionErrorDto,
  SimulacionListItemDto,
  ProductoCandidatoDto,
  ProductoSeleccionadoDto,
} from './dto/simulacion.dto';

/**
 * Interface interna para productos con ganancia calculada
 */
interface ProductoConGanancia extends ProductoCandidatoDto {
  ganancia_esperada: number;
  eficiencia: number; // ganancia por unidad de precio (para optimización)
}

/**
 * Interface para el resultado de la optimización
 */
interface ResultadoOptimizacion {
  productos: ProductoConGanancia[];
  costo_total: number;
  ganancia_total: number;
}

/**
 * SimulacionService - Implementa el Service Pattern
 * Contiene la lógica de optimización de inversiones usando programación dinámica
 * 
 * Principio de Responsabilidad Única (SRP): Solo se encarga de la lógica de simulaciones
 * Principio Abierto/Cerrado (OCP): El algoritmo puede extenderse para diferentes estrategias
 */
@Injectable()
export class SimulacionService {
  constructor(
    private readonly simulacionRepository: SimulacionRepository,
    private readonly usuarioService: UsuarioService,
  ) {}

  /**
   * Crea una nueva simulación de inversión
   * Implementa el algoritmo de optimización (problema de la mochila 0/1)
   */
  async crearSimulacion(
    request: SimulacionRequestDto,
  ): Promise<SimulacionResponseDto | SimulacionErrorDto> {
    // Verificar que el usuario existe
    const usuarioExists = await this.usuarioService.exists(request.usuario_id);
    if (!usuarioExists) {
      throw new NotFoundException(`Usuario con ID ${request.usuario_id} no encontrado`);
    }

    // Validar que hay productos en la solicitud
    if (!request.productos || request.productos.length === 0) {
      throw new BadRequestException('Debe proporcionar al menos un producto para la simulación');
    }

    // Calcular ganancia esperada para cada producto
    const productosConGanancia = this.calcularGananciasProductos(request.productos);

    // Filtrar productos que están dentro del presupuesto
    const productosViables = productosConGanancia.filter(
      (p) => p.precio <= request.capital_disponible && p.precio > 0,
    );

    // Caso: Fondos insuficientes - ningún producto es viable
    if (productosViables.length === 0) {
      const productosConPrecio = request.productos.filter((p) => p.precio > 0);
      
      if (productosConPrecio.length === 0) {
        // Solo hay productos con precio 0
        return this.crearRespuestaProductosGratis(request, productosConGanancia);
      }

      const productoMasBarato = Math.min(...productosConPrecio.map((p) => p.precio));
      return new SimulacionErrorDto({
        error: 'Fondos insuficientes',
        detalle: `El capital disponible ($${request.capital_disponible.toFixed(2)}) es insuficiente para adquirir cualquier producto de la lista.`,
        capital_disponible: request.capital_disponible,
        producto_mas_barato: productoMasBarato,
        diferencia_necesaria: Number((productoMasBarato - request.capital_disponible).toFixed(2)),
        recomendacion: 'Aumente su capital o consulte productos con menor inversión mínima.',
      });
    }

    // Ejecutar algoritmo de optimización (Problema de la Mochila 0/1)
    const resultado = this.optimizarInversion(
      productosViables,
      request.capital_disponible,
    );

    // Incluir productos gratis si existen
    const productosGratis = productosConGanancia.filter((p) => p.precio === 0);
    resultado.productos.push(...productosGratis);
    resultado.ganancia_total += productosGratis.reduce((sum, p) => sum + p.ganancia_esperada, 0);

    // Calcular métricas finales
    const capitalRestante = Number((request.capital_disponible - resultado.costo_total).toFixed(2));
    const eficienciaCapital = request.capital_disponible > 0 
      ? Number(((resultado.costo_total / request.capital_disponible) * 100).toFixed(2))
      : 0;
    const retornoTotalPorcentaje = resultado.costo_total > 0
      ? Number(((resultado.ganancia_total / resultado.costo_total) * 100).toFixed(2))
      : 0;

    // Generar mensaje según el resultado
    const mensaje = this.generarMensaje(eficienciaCapital, resultado.ganancia_total);

    // Preparar productos seleccionados para la respuesta
    const productosSeleccionados = resultado.productos.map(
      (p) =>
        new ProductoSeleccionadoDto({
          nombre: p.nombre,
          precio: p.precio,
          porcentaje_ganancia: p.porcentaje_ganancia,
          ganancia_esperada: Number(p.ganancia_esperada.toFixed(2)),
        }),
    );

    // Guardar la simulación en la base de datos
    const simulacionData: CreateSimulacionData = {
      usuario_id: request.usuario_id,
      capital_disponible: request.capital_disponible,
      costo_total: resultado.costo_total,
      capital_restante: capitalRestante,
      ganancia_total: Number(resultado.ganancia_total.toFixed(2)),
      retorno_total_porcentaje: retornoTotalPorcentaje,
      eficiencia_capital: eficienciaCapital,
      productos_seleccionados: productosSeleccionados,
      mensaje: mensaje,
    };

    const simulacionGuardada = await this.simulacionRepository.create(simulacionData);

    return new SimulacionResponseDto({
      id: simulacionGuardada.id,
      usuario_id: simulacionGuardada.usuario_id,
      fecha_simulacion: simulacionGuardada.fecha_simulacion,
      capital_disponible: Number(simulacionGuardada.capital_disponible),
      productos_seleccionados: productosSeleccionados,
      costo_total: resultado.costo_total,
      capital_restante: capitalRestante,
      ganancia_total: Number(resultado.ganancia_total.toFixed(2)),
      retorno_total_porcentaje: retornoTotalPorcentaje,
      eficiencia_capital: eficienciaCapital,
      mensaje: mensaje,
    });
  }

  /**
   * Obtiene las simulaciones de un usuario específico
   */
  async obtenerSimulacionesPorUsuario(usuarioId: string): Promise<SimulacionListItemDto[]> {
    // Verificar que el usuario existe
    const usuarioExists = await this.usuarioService.exists(usuarioId);
    if (!usuarioExists) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
    }

    const simulaciones = await this.simulacionRepository.findByUsuarioId(usuarioId);
    return simulaciones.map((simulacion) => this.mapToListItemDto(simulacion));
  }

  /**
   * Obtiene una simulación por su ID
   */
  async obtenerSimulacionPorId(id: string): Promise<SimulacionResponseDto> {
    const simulacion = await this.simulacionRepository.findById(id);
    if (!simulacion) {
      throw new NotFoundException(`Simulación con ID ${id} no encontrada`);
    }
    return this.mapToResponseDto(simulacion);
  }

  /**
   * Calcula la ganancia esperada para cada producto
   */
  private calcularGananciasProductos(productos: ProductoCandidatoDto[]): ProductoConGanancia[] {
    return productos.map((producto) => {
      const gananciaEsperada = (producto.precio * producto.porcentaje_ganancia) / 100;
      const eficiencia = producto.precio > 0 ? gananciaEsperada / producto.precio : 0;
      return {
        ...producto,
        ganancia_esperada: gananciaEsperada,
        eficiencia: eficiencia,
      };
    });
  }

  /**
   * Algoritmo de optimización: Problema de la Mochila 0/1
   * Encuentra la combinación de productos que maximiza la ganancia
   * sin exceder el capital disponible
   * 
   * Complejidad: O(n * W) donde n = número de productos, W = capital
   */
  private optimizarInversion(
    productos: ProductoConGanancia[],
    capitalDisponible: number,
  ): ResultadoOptimizacion {
    const n = productos.length;
    
    // Convertir a centavos para evitar problemas de punto flotante
    const capitalCentavos = Math.floor(capitalDisponible * 100);
    const productosCentavos = productos.map((p) => ({
      ...p,
      precioCentavos: Math.floor(p.precio * 100),
      gananciaCentavos: Math.floor(p.ganancia_esperada * 100),
    }));

    // Tabla de programación dinámica
    // dp[i][w] = máxima ganancia usando los primeros i productos con capacidad w
    const dp: number[][] = Array(n + 1)
      .fill(null)
      .map(() => Array(capitalCentavos + 1).fill(0));

    // Llenar la tabla
    for (let i = 1; i <= n; i++) {
      const producto = productosCentavos[i - 1];
      for (let w = 0; w <= capitalCentavos; w++) {
        if (producto.precioCentavos <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w], // No incluir el producto
            dp[i - 1][w - producto.precioCentavos] + producto.gananciaCentavos, // Incluir el producto
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // Reconstruir la solución
    const productosSeleccionados: ProductoConGanancia[] = [];
    let w = capitalCentavos;
    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        productosSeleccionados.push(productos[i - 1]);
        w -= productosCentavos[i - 1].precioCentavos;
      }
    }

    // Calcular totales
    const costoTotal = productosSeleccionados.reduce((sum, p) => sum + p.precio, 0);
    const gananciaTotal = productosSeleccionados.reduce((sum, p) => sum + p.ganancia_esperada, 0);

    return {
      productos: productosSeleccionados,
      costo_total: Number(costoTotal.toFixed(2)),
      ganancia_total: gananciaTotal,
    };
  }

  /**
   * Crea respuesta para cuando solo hay productos gratuitos disponibles
   */
  private crearRespuestaProductosGratis(
    request: SimulacionRequestDto,
    productosConGanancia: ProductoConGanancia[],
  ): SimulacionResponseDto {
    const productosGratis = productosConGanancia.filter((p) => p.precio === 0);
    const gananciaTotal = productosGratis.reduce((sum, p) => sum + p.ganancia_esperada, 0);

    const productosSeleccionados = productosGratis.map(
      (p) =>
        new ProductoSeleccionadoDto({
          nombre: p.nombre,
          precio: p.precio,
          porcentaje_ganancia: p.porcentaje_ganancia,
          ganancia_esperada: Number(p.ganancia_esperada.toFixed(2)),
        }),
    );

    return new SimulacionResponseDto({
      id: '',
      usuario_id: request.usuario_id,
      fecha_simulacion: new Date(),
      capital_disponible: request.capital_disponible,
      productos_seleccionados: productosSeleccionados,
      costo_total: 0,
      capital_restante: request.capital_disponible,
      ganancia_total: Number(gananciaTotal.toFixed(2)),
      retorno_total_porcentaje: 0,
      mensaje: 'Simulación con productos gratuitos únicamente',
    });
  }

  /**
   * Genera un mensaje descriptivo según el resultado de la optimización
   */
  private generarMensaje(eficienciaCapital: number, gananciaTotal: number): string {
    if (eficienciaCapital >= 90) {
      return `Simulación óptima con alta eficiencia de capital (${eficienciaCapital}% utilizado)`;
    } else if (eficienciaCapital >= 70) {
      return 'Simulación exitosa con ganancias óptimas';
    } else if (gananciaTotal > 0) {
      return 'Simulación con ganancias mínimas. Considere aumentar capital para mejores opciones.';
    } else {
      return 'Simulación completada. No se encontraron productos rentables con el capital disponible.';
    }
  }

  /**
   * Mapea la entidad Simulacion al DTO de lista
   */
  private mapToListItemDto(simulacion: Simulacion): SimulacionListItemDto {
    const productosSeleccionados = simulacion.productos_seleccionados as any[];
    return new SimulacionListItemDto({
      id: simulacion.id,
      usuario_id: simulacion.usuario_id,
      fecha_simulacion: simulacion.fecha_simulacion,
      capital_disponible: Number(simulacion.capital_disponible),
      ganancia_total: Number(simulacion.ganancia_total),
      cantidad_productos: productosSeleccionados?.length || 0,
      retorno_porcentaje: Number(simulacion.retorno_total_porcentaje),
    });
  }

  /**
   * Mapea la entidad Simulacion al DTO de respuesta completa
   */
  private mapToResponseDto(simulacion: Simulacion): SimulacionResponseDto {
    const productosSeleccionados = (simulacion.productos_seleccionados as any[]).map(
      (p) =>
        new ProductoSeleccionadoDto({
          nombre: p.nombre,
          precio: p.precio,
          porcentaje_ganancia: p.porcentaje_ganancia,
          ganancia_esperada: p.ganancia_esperada,
        }),
    );

    return new SimulacionResponseDto({
      id: simulacion.id,
      usuario_id: simulacion.usuario_id,
      fecha_simulacion: simulacion.fecha_simulacion,
      capital_disponible: Number(simulacion.capital_disponible),
      productos_seleccionados: productosSeleccionados,
      costo_total: Number(simulacion.costo_total),
      capital_restante: Number(simulacion.capital_restante),
      ganancia_total: Number(simulacion.ganancia_total),
      retorno_total_porcentaje: Number(simulacion.retorno_total_porcentaje),
      eficiencia_capital: Number(simulacion.eficiencia_capital),
      mensaje: simulacion.mensaje,
    });
  }
}
