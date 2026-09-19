import { Inject, Injectable } from '@nestjs/common';
import { HORARIO_REPOSITORY } from './horarios.tokens.js';
import type { HorarioRepository } from './dominio/horario.repository.js';
import type { CambiosHorario, Horario, NuevoHorario } from './dominio/entidades.js';

// Este modulo no tiene reglas de negocio propias: el cupo se sigue
// validando solo en Inscripciones. Por eso los cinco metodos delegan.
// Cuando aparezca una regla de horarios, este es su lugar.
//
// Fijate en lo que NO hay aqui: ni req, ni res, ni un codigo de estado,
// ni la palabra Express. Este archivo no sabe que lo llaman por HTTP.
@Injectable()
export class HorariosService {
  // `import type` arriba es obligatorio: con isolatedModules y
  // emitDecoratorMetadata prendidos, TypeScript lo exige para un tipo
  // usado en una firma decorada. Y no estorba, porque el token del
  // @Inject ya le dice a Nest que buscar.
  constructor(
    @Inject(HORARIO_REPOSITORY)
    private readonly repo: HorarioRepository,
  ) {}

  async listar(): Promise<Horario[]> {
    return this.repo.listar();
  }

  async buscar(id: number): Promise<Horario | null> {
    return this.repo.buscarPorId(id);
  }

  async crear(datos: NuevoHorario): Promise<Horario> {
    return this.repo.crear(datos);
  }

  async actualizar(id: number, cambios: CambiosHorario): Promise<Horario | null> {
    return this.repo.actualizar(id, cambios);
  }

  async eliminar(id: number): Promise<Horario | null> {
    return this.repo.eliminar(id);
  }
}
