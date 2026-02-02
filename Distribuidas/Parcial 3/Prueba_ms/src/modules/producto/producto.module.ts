import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { ProductoRepository } from './producto.repository';

/**
 * ProductoModule - Módulo que agrupa toda la funcionalidad de productos
 */
@Module({
  controllers: [ProductoController],
  providers: [ProductoService, ProductoRepository],
  exports: [ProductoService],
})
export class ProductoModule {}
