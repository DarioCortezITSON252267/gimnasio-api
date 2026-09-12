import { Module } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service.js';
import { InscripcionesController } from './inscripciones.controller.js';
import { InscripcionMemoriaRepository } from './infra/inscripcion-memoria.repository.js';
import { INSCRIPCION_REPOSITORY } from './dominio/inscripcion.repository.js';

@Module({
  providers: [
    InscripcionesService,
    { provide: INSCRIPCION_REPOSITORY, useClass: InscripcionMemoriaRepository },
  ],
  controllers: [InscripcionesController],
})
export class InscripcionesModule {}
