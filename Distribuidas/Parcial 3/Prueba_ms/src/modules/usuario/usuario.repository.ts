import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';

/**
 * UsuarioRepository - Implementa el Repository Pattern
 * Principio de Responsabilidad Única (SRP): Solo se encarga del acceso a datos de usuarios
 * Principio de Segregación de Interfaces (ISP): Implementa solo las operaciones necesarias
 */
@Injectable()
export class UsuarioRepository implements IBaseRepository<Usuario, CreateUsuarioDto, UpdateUsuarioDto> {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene todos los usuarios
   */
  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Busca un usuario por su ID
   */
  async findById(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  /**
   * Busca un usuario por su email
   */
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  /**
   * Crea un nuevo usuario
   */
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    return this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        capital_disponible: data.capital_disponible,
      },
    });
  }

  /**
   * Actualiza un usuario existente
   */
  async update(id: string, data: UpdateUsuarioDto): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina un usuario
   */
  async delete(id: string): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
