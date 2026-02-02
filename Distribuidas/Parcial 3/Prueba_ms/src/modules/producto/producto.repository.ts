import { Injectable } from '@nestjs/common';
import { ProductoFinanciero } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';
import type { CreateProductoDto, UpdateProductoDto } from './dto/producto.dto';

/**
 * ProductoRepository - Implementa el Repository Pattern
 * Principio de Responsabilidad Única (SRP): Solo se encarga del acceso a datos de productos
 */
@Injectable()
export class ProductoRepository implements IBaseRepository<ProductoFinanciero, CreateProductoDto, UpdateProductoDto> {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene todos los productos
   */
  async findAll(): Promise<ProductoFinanciero[]> {
    return this.prisma.productoFinanciero.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Obtiene solo productos activos
   */
  async findAllActive(): Promise<ProductoFinanciero[]> {
    return this.prisma.productoFinanciero.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
    });
  }

  /**
   * Busca un producto por su ID
   */
  async findById(id: string): Promise<ProductoFinanciero | null> {
    return this.prisma.productoFinanciero.findUnique({
      where: { id },
    });
  }

  /**
   * Busca productos por nombre (búsqueda parcial)
   */
  async findByName(nombre: string): Promise<ProductoFinanciero[]> {
    return this.prisma.productoFinanciero.findMany({
      where: {
        nombre: {
          contains: nombre,
          mode: 'insensitive',
        },
      },
    });
  }

  /**
   * Crea un nuevo producto
   */
  async create(data: CreateProductoDto): Promise<ProductoFinanciero> {
    return this.prisma.productoFinanciero.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        costo: data.costo,
        porcentaje_retorno: data.porcentaje_retorno,
        activo: data.activo ?? true,
      },
    });
  }

  /**
   * Actualiza un producto existente
   */
  async update(id: string, data: UpdateProductoDto): Promise<ProductoFinanciero> {
    return this.prisma.productoFinanciero.update({
      where: { id },
      data,
    });
  }

  /**
   * Elimina un producto
   */
  async delete(id: string): Promise<ProductoFinanciero> {
    return this.prisma.productoFinanciero.delete({
      where: { id },
    });
  }
}
