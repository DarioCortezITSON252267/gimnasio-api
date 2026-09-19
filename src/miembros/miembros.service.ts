import { Inject, Injectable } from '@nestjs/common';
import { MIEMBRO_REPOSITORY } from './miembros.tokens.js';
import type { MiembroRepository } from './dominio/miembro.repository.js';
import type { CambiosMiembro, Miembro, NuevoMiembro } from './dominio/entidades.js';

// Este modulo NO tiene reglas de negocio propias: el cupo se sigue
// validando solo en Inscripciones. Por eso los cinco metodos delegan
// y ya. Cuando aparezca una regla de miembros, este es su lugar.
//
// Fijate en lo que NO aparece en este archivo: ni `req`, ni `res`, ni
// un codigo de estado, ni la palabra Express. No sabe que lo llaman
// por HTTP. Podrias llamarlo desde una tarea programada o desde una
// terminal y funcionaria igual.
@Injectable()
export class MiembrosService {
  // `import type` arriba no es capricho: con isolatedModules y
  // emitDecoratorMetadata prendidos, TypeScript exige que un tipo usado
  // en una firma decorada se importe asi. Y no estorba, porque el token
  // del @Inject ya le dice a Nest que buscar.
  constructor(
    @Inject(MIEMBRO_REPOSITORY)
    private readonly repo: MiembroRepository,
  ) {}

  async listar(): Promise<Miembro[]> {
    return this.repo.listar();
  }

  async buscar(id: number): Promise<Miembro | null> {
    return this.repo.buscarPorId(id);
  }

  async crear(datos: NuevoMiembro): Promise<Miembro> {
    return this.repo.crear(datos);
  }

  async actualizar(id: number, cambios: CambiosMiembro): Promise<Miembro | null> {
    return this.repo.actualizar(id, cambios);
  }

  async eliminar(id: number): Promise<Miembro | null> {
    return this.repo.eliminar(id);
  }
}
