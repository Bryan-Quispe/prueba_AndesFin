import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { UsuarioRepository } from './usuario.repository';
import { CreateUsuarioDto, UpdateUsuarioDto, UsuarioResponseDto } from './dto/usuario.dto';

/**
 * UsuarioService - Implementa el Service Pattern
 * Principio de Responsabilidad Única (SRP): Contiene solo la lógica de negocio de usuarios
 * Principio Abierto/Cerrado (OCP): Extensible sin modificar código existente
 */
@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  /**
   * Obtiene todos los usuarios
   */
  async findAll(): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.usuarioRepository.findAll();
    return usuarios.map((usuario) => this.mapToResponseDto(usuario));
  }

  /**
   * Busca un usuario por su ID
   */
  async findById(id: string): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return this.mapToResponseDto(usuario);
  }

  /**
   * Crea un nuevo usuario
   */
  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioResponseDto> {
    // Verificar si el email ya existe
    const existingUser = await this.usuarioRepository.findByEmail(createUsuarioDto.email);
    if (existingUser) {
      throw new ConflictException(`El email ${createUsuarioDto.email} ya está registrado`);
    }

    const usuario = await this.usuarioRepository.create(createUsuarioDto);
    return this.mapToResponseDto(usuario);
  }

  /**
   * Actualiza un usuario existente
   */
  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioResponseDto> {
    // Verificar si el usuario existe
    await this.findById(id);

    // Si se está actualizando el email, verificar que no exista
    if (updateUsuarioDto.email) {
      const existingUser = await this.usuarioRepository.findByEmail(updateUsuarioDto.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(`El email ${updateUsuarioDto.email} ya está registrado`);
      }
    }

    const usuario = await this.usuarioRepository.update(id, updateUsuarioDto);
    return this.mapToResponseDto(usuario);
  }

  /**
   * Elimina un usuario
   */
  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.usuarioRepository.delete(id);
  }

  /**
   * Verifica si un usuario existe
   */
  async exists(id: string): Promise<boolean> {
    const usuario = await this.usuarioRepository.findById(id);
    return usuario !== null;
  }

  /**
   * Mapea la entidad Usuario al DTO de respuesta
   */
  private mapToResponseDto(usuario: Usuario): UsuarioResponseDto {
    return new UsuarioResponseDto({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      capital_disponible: Number(usuario.capital_disponible),
    });
  }
}
