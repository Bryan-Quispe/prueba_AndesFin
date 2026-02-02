import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto, UsuarioResponseDto } from './dto/usuario.dto';

/**
 * UsuarioController - Maneja las peticiones HTTP para usuarios
 * Principio de Responsabilidad Única (SRP): Solo maneja la capa de presentación
 */
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  /**
   * GET /usuarios
   * Obtiene todos los usuarios
   */
  @Get()
  async findAll(): Promise<UsuarioResponseDto[]> {
    return this.usuarioService.findAll();
  }

  /**
   * GET /usuarios/:id
   * Obtiene un usuario por su ID
   */
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<UsuarioResponseDto> {
    return this.usuarioService.findById(id);
  }

  /**
   * POST /usuarios
   * Crea un nuevo usuario
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<UsuarioResponseDto> {
    return this.usuarioService.create(createUsuarioDto);
  }

  /**
   * PUT /usuarios/:id
   * Actualiza un usuario existente
   */
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  /**
   * DELETE /usuarios/:id
   * Elimina un usuario
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usuarioService.delete(id);
  }
}
