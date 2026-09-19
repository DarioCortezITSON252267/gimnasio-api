import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ClasesModule } from './clases/clases.module.js';
import { InscripcionesModule } from './inscripciones/inscripciones.module.js';
import { MiembrosModule } from './miembros/miembros.module.js';

@Module({
  imports: [ClasesModule, InscripcionesModule, MiembrosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
