import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, Min } from 'class-validator';

/**
 * DTO de solicitud para crear un producto financiero
 */
export class CreateProductoRequestDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  costo: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  porcentaje_retorno: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

/**
 * DTO de solicitud para actualizar un producto financiero
 */
export class UpdateProductoRequestDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  costo?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  porcentaje_retorno?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

/**
 * DTO de respuesta para producto financiero
 */
export class ProductoResponseDto {
  @IsUUID()
  id: string;

  nombre: string;
  descripcion: string;
  costo: number;
  porcentaje_retorno: number;
  activo: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<ProductoResponseDto>) {
    Object.assign(this, partial);
  }
}

// Alias para compatibilidad
export type CreateProductoDto = CreateProductoRequestDto;
export type UpdateProductoDto = UpdateProductoRequestDto;
