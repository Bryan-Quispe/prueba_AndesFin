import {
  IsString,
  IsNumber,
  IsUUID,
  IsArray,
  ValidateNested,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para un producto candidato en la simulación
 */
export class ProductoCandidatoDto {
  @IsString()
  nombre: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  porcentaje_ganancia: number;
}

/**
 * DTO de solicitud para crear una simulación
 */
export class CreateSimulacionRequestDto {
  @IsUUID()
  usuario_id: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  capital_disponible: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductoCandidatoDto)
  productos: ProductoCandidatoDto[];
}

// Alias para compatibilidad
export type SimulacionRequestDto = CreateSimulacionRequestDto;

/**
 * DTO para un producto seleccionado en la respuesta
 */
export class ProductoSeleccionadoDto {
  nombre: string;
  precio: number;
  porcentaje_ganancia: number;
  ganancia_esperada: number;

  constructor(partial: Partial<ProductoSeleccionadoDto>) {
    Object.assign(this, partial);
  }
}

/**
 * DTO de respuesta para una simulación exitosa
 */
export class SimulacionResponseDto {
  @IsUUID()
  id: string;

  @IsUUID()
  usuario_id: string;

  fecha_simulacion: Date;
  capital_disponible: number;
  productos_seleccionados: ProductoSeleccionadoDto[];
  costo_total: number;
  capital_restante: number;
  ganancia_total: number;
  retorno_total_porcentaje: number;
  eficiencia_capital?: number;
  mensaje: string;

  constructor(partial: Partial<SimulacionResponseDto>) {
    Object.assign(this, partial);
  }
}

/**
 * DTO de respuesta cuando hay fondos insuficientes
 */
export class SimulacionErrorDto {
  error: string;
  detalle: string;
  capital_disponible: number;
  producto_mas_barato: number;
  diferencia_necesaria: number;
  recomendacion: string;

  constructor(partial: Partial<SimulacionErrorDto>) {
    Object.assign(this, partial);
  }
}

/**
 * DTO para listar simulaciones de un usuario
 */
export class SimulacionListItemDto {
  @IsUUID()
  id: string;

  @IsUUID()
  usuario_id: string;

  fecha_simulacion: Date;
  capital_disponible: number;
  ganancia_total: number;
  cantidad_productos: number;
  retorno_porcentaje: number;

  constructor(partial: Partial<SimulacionListItemDto>) {
    Object.assign(this, partial);
  }
}
