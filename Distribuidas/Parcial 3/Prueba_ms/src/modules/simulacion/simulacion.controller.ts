import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SimulacionService } from './simulacion.service';
import {
  SimulacionRequestDto,
  SimulacionResponseDto,
  SimulacionErrorDto,
  SimulacionListItemDto,
} from './dto/simulacion.dto';

/**
 * SimulacionController - Maneja las peticiones HTTP para simulaciones de inversión
 * Principio de Responsabilidad Única (SRP): Solo maneja la capa de presentación
 */
@Controller('simulaciones')
export class SimulacionController {
  constructor(private readonly simulacionService: SimulacionService) {}

  /**
   * POST /simulaciones
   * Crea una nueva simulación de inversión
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crearSimulacion(
    @Body() simulacionRequestDto: SimulacionRequestDto,
  ): Promise<SimulacionResponseDto | SimulacionErrorDto> {
    return this.simulacionService.crearSimulacion(simulacionRequestDto);
  }

  /**
   * GET /simulaciones/:usuarioId
   * Obtiene las simulaciones de un usuario específico
   */
  @Get(':usuarioId')
  async obtenerSimulacionesPorUsuario(
    @Param('usuarioId', ParseUUIDPipe) usuarioId: string,
  ): Promise<SimulacionListItemDto[]> {
    return this.simulacionService.obtenerSimulacionesPorUsuario(usuarioId);
  }

  /**
   * GET /simulaciones/detalle/:id
   * Obtiene el detalle completo de una simulación
   */
  @Get('detalle/:id')
  async obtenerSimulacionPorId(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<SimulacionResponseDto> {
    return this.simulacionService.obtenerSimulacionPorId(id);
  }
}
