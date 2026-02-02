import { Module } from '@nestjs/common';
import { SimulacionController } from './simulacion.controller';
import { SimulacionService } from './simulacion.service';
import { SimulacionRepository } from './simulacion.repository';
import { UsuarioModule } from '../usuario/usuario.module';

/**
 * SimulacionModule - Módulo que agrupa toda la funcionalidad de simulaciones
 */
@Module({
  imports: [UsuarioModule],
  controllers: [SimulacionController],
  providers: [SimulacionService, SimulacionRepository],
  exports: [SimulacionService],
})
export class SimulacionModule {}
