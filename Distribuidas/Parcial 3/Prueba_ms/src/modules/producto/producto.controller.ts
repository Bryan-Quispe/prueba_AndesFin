import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import type { UpdateProductoDto, ProductoResponseDto, CreateProductoRequestDto } from './dto/producto.dto';

/**
 * ProductoController - Maneja las peticiones HTTP para productos financieros
 * Principio de Responsabilidad Única (SRP): Solo maneja la capa de presentación
 */
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  /**
   * GET /productos
   * Obtiene todos los productos activos
   */
  @Get()
  async findAllActive(): Promise<ProductoResponseDto[]> {
    return this.productoService.findAllActive();
  }

  /**
   * GET /productos/all
   * Obtiene todos los productos (incluyendo inactivos)
   */
  @Get('all')
  async findAll(): Promise<ProductoResponseDto[]> {
    return this.productoService.findAll();
  }

  /**
   * GET /productos/:id
   * Obtiene un producto por su ID
   */
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<ProductoResponseDto> {
    return this.productoService.findById(id);
  }

  /**
   * POST /productos
   * Crea un nuevo producto
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductoDto: CreateProductoRequestDto): Promise<ProductoResponseDto> {
    return this.productoService.create(createProductoDto);
  }

  /**
   * PUT /productos/:id
   * Actualiza un producto existente
   */
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ): Promise<ProductoResponseDto> {
    return this.productoService.update(id, updateProductoDto);
  }

  /**
   * DELETE /productos/:id
   * Elimina un producto
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productoService.delete(id);
  }

  /**
   * PATCH /productos/:id/activate
   * Activa un producto
   */
  @Patch(':id/activate')
  async activate(@Param('id', ParseUUIDPipe) id: string): Promise<ProductoResponseDto> {
    return this.productoService.activate(id);
  }

  /**
   * PATCH /productos/:id/deactivate
   * Desactiva un producto
   */
  @Patch(':id/deactivate')
  async deactivate(@Param('id', ParseUUIDPipe) id: string): Promise<ProductoResponseDto> {
    return this.productoService.deactivate(id);
  }
}
