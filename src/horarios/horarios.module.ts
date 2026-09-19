import { Module } from '@nestjs/common';
import { HorariosService } from './horarios.service.js';
import { HorariosController } from './horarios.controller.js';
import { HorarioMemoriaRepository } from './infra/horario-memoria.repository.js';
import { HORARIO_REPOSITORY } from './horarios.tokens.js';

@Module({
  providers: [
    // Proveedor 1: la clase, que es su propia llave.
    HorariosService,
    // Proveedor 2: el token amarrado a una implementacion concreta.
    // Esta linea es el unico lugar del modulo que sabe que hoy los
    // horarios viven en un arreglo.
    { provide: HORARIO_REPOSITORY, useClass: HorarioMemoriaRepository },
  ],
  controllers: [HorariosController],
})
export class HorariosModule {}
