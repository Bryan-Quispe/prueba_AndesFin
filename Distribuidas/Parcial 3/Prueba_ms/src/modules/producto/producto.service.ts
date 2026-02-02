import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductoFinanciero } from '@prisma/client';
import { ProductoRepository } from './producto.repository';
import { CreateProductoDto, UpdateProductoDto, ProductoResponseDto } from './dto/producto.dto';

/**
 * ProductoService - Implementa el Service Pattern
 * Principio de Responsabilidad Única (SRP): Contiene solo la lógica de negocio de productos
 */
@Injectable()
export class ProductoService {
  constructor(private readonly productoRepository: ProductoRepository) {}

  /**
   * Obtiene todos los productos activos
   */
  async findAllActive(): Promise<ProductoResponseDto[]> {
    const productos = await this.productoRepository.findAllActive();
    return productos.map((producto) => this.mapToResponseDto(producto));
  }

  /**
   * Obtiene todos los productos (incluyendo inactivos)
   */
  async findAll(): Promise<ProductoResponseDto[]> {
    const productos = await this.productoRepository.findAll();
    return productos.map((producto) => this.mapToResponseDto(producto));
  }

  /**
   * Busca un producto por su ID
   */
  async findById(id: string): Promise<ProductoResponseDto> {
    const producto = await this.productoRepository.findById(id);
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return this.mapToResponseDto(producto);
  }

  /**
   * Crea un nuevo producto
   */
  async create(createProductoDto: CreateProductoDto): Promise<ProductoResponseDto> {
    const producto = await this.productoRepository.create(createProductoDto);
    return this.mapToResponseDto(producto);
  }

  /**
   * Actualiza un producto existente
   */
  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<ProductoResponseDto> {
    await this.findById(id);
    const producto = await this.productoRepository.update(id, updateProductoDto);
    return this.mapToResponseDto(producto);
  }

  /**
   * Elimina un producto
   */
  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.productoRepository.delete(id);
  }

  /**
   * Desactiva un producto (soft delete)
   */
  async deactivate(id: string): Promise<ProductoResponseDto> {
    await this.findById(id);
    const producto = await this.productoRepository.update(id, { activo: false });
    return this.mapToResponseDto(producto);
  }

  /**
   * Activa un producto
   */
  async activate(id: string): Promise<ProductoResponseDto> {
    await this.findById(id);
    const producto = await this.productoRepository.update(id, { activo: true });
    return this.mapToResponseDto(producto);
  }

  /**
   * Mapea la entidad ProductoFinanciero al DTO de respuesta
   */
  private mapToResponseDto(producto: ProductoFinanciero): ProductoResponseDto {
    return new ProductoResponseDto({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      costo: Number(producto.costo),
      porcentaje_retorno: Number(producto.porcentaje_retorno),
      activo: producto.activo,
    });
  }
}
