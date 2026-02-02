import { Injectable } from '@nestjs/common';
import { Simulacion } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

/**
 * Interface para crear una simulación
 */
export interface CreateSimulacionData {
  usuario_id: string;
  capital_disponible: number;
  costo_total: number;
  capital_restante: number;
  ganancia_total: number;
  retorno_total_porcentaje: number;
  eficiencia_capital: number;
  productos_seleccionados: any;
  mensaje: string;
}

/**
 * SimulacionRepository - Implementa el Repository Pattern
 * Principio de Responsabilidad Única (SRP): Solo se encarga del acceso a datos de simulaciones
 */
@Injectable()
export class SimulacionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene todas las simulaciones
   */
  async findAll(): Promise<Simulacion[]> {
    return this.prisma.simulacion.findMany({
      orderBy: { fecha_simulacion: 'desc' },
      include: { usuario: true },
    });
  }

  /**
   * Busca una simulación por su ID
   */
  async findById(id: string): Promise<Simulacion | null> {
    return this.prisma.simulacion.findUnique({
      where: { id },
      include: { usuario: true },
    });
  }

  /**
   * Obtiene las simulaciones de un usuario específico
   */
  async findByUsuarioId(usuarioId: string): Promise<Simulacion[]> {
    return this.prisma.simulacion.findMany({
      where: { usuario_id: usuarioId },
      orderBy: { fecha_simulacion: 'desc' },
    });
  }

  /**
   * Crea una nueva simulación
   */
  async create(data: CreateSimulacionData): Promise<Simulacion> {
    return this.prisma.simulacion.create({
      data: {
        usuario_id: data.usuario_id,
        capital_disponible: data.capital_disponible,
        costo_total: data.costo_total,
        capital_restante: data.capital_restante,
        ganancia_total: data.ganancia_total,
        retorno_total_porcentaje: data.retorno_total_porcentaje,
        eficiencia_capital: data.eficiencia_capital,
        productos_seleccionados: data.productos_seleccionados,
        mensaje: data.mensaje,
      },
      include: { usuario: true },
    });
  }

  /**
   * Elimina una simulación
   */
  async delete(id: string): Promise<Simulacion> {
    return this.prisma.simulacion.delete({
      where: { id },
    });
  }

  /**
   * Cuenta las simulaciones de un usuario
   */
  async countByUsuarioId(usuarioId: string): Promise<number> {
    return this.prisma.simulacion.count({
      where: { usuario_id: usuarioId },
    });
  }
}
