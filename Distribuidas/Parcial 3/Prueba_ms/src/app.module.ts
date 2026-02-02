import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ProductoModule } from './modules/producto/producto.module';
import { SimulacionModule } from './modules/simulacion/simulacion.module';

@Module({
  imports: [
    PrismaModule,
    UsuarioModule,
    ProductoModule,
    SimulacionModule,
  ],
})
export class AppModule {}
