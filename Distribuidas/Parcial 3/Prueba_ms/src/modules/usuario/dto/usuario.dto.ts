import { IsString, IsEmail, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

/**
 * DTO de solicitud para crear un usuario
 */
export class CreateUsuarioRequestDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  capital_disponible: number;
}

/**
 * DTO de solicitud para actualizar un usuario
 */
export class UpdateUsuarioRequestDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  capital_disponible?: number;
}

/**
 * DTO de respuesta para usuario
 */
export class UsuarioResponseDto {
  @IsUUID()
  id: string;

  nombre: string;
  email: string;
  capital_disponible: number;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<UsuarioResponseDto>) {
    Object.assign(this, partial);
  }
}

// Alias para compatibilidad
export type CreateUsuarioDto = CreateUsuarioRequestDto;
export type UpdateUsuarioDto = UpdateUsuarioRequestDto;
