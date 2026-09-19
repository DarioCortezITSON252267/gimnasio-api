import { Module } from '@nestjs/common';
import { MiembrosService } from './miembros.service.js';
import { MiembrosController } from './miembros.controller.js';
import { MiembroMemoriaRepository } from './infra/miembro-memoria.repository.js';
import { MIEMBRO_REPOSITORY } from './miembros.tokens.js';

@Module({
  providers: [
    // Proveedor 1: la clase, que es su propia llave.
    MiembrosService,
    // Proveedor 2: el token amarrado a una implementacion concreta.
    // Esta linea es el unico lugar del modulo que sabe que hoy los
    // miembros viven en un arreglo. Cambiarla por
    // MiembroPrismaRepository seria toda la migracion a MySQL.
    { provide: MIEMBRO_REPOSITORY, useClass: MiembroMemoriaRepository },
  ],
  controllers: [MiembrosController],
})
export class MiembrosModule {}
