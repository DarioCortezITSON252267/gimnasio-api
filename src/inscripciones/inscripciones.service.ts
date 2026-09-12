import { Inject, Injectable } from '@nestjs/common';
import {
  INSCRIPCION_REPOSITORY,
  type InscripcionRepository,
} from './dominio/inscripcion.repository.js';
import type { Inscripcion } from './dominio/entidades.js';
import type { CrearInscripcionDto } from './dto/crear-inscripcion.dto.js';
import {
  CupoLlenoError,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  InscripcionNoEncontradaError,
  MiembroNoEncontradoError,
} from './dominio/errores.js';

@Injectable()
export class InscripcionesService {
  constructor(
    @Inject(INSCRIPCION_REPOSITORY)
    private readonly repo: InscripcionRepository,
  ) {}

  async listar(): Promise<Inscripcion[]> {
    return this.repo.listar();
  }

  async crear(dto: CrearInscripcionDto): Promise<Inscripcion> {
    const horario = await this.repo.buscarHorario(dto.horarioId);
    if (horario === null) {
      throw new HorarioNoEncontradoError(dto.horarioId);
    }

    const miembro = await this.repo.buscarMiembro(dto.miembroId);
    if (miembro === null) {
      throw new MiembroNoEncontradoError(dto.miembroId);
    }
    const delHorario = await this.repo.buscarPorHorario(dto.horarioId);
    const confirmadas = delHorario.filter((i) => i.estado === 'confirmada');
    if (confirmadas.some((i) => i.miembroId === dto.miembroId)) {
      throw new InscripcionDuplicadaError(dto.horarioId, dto.miembroId);
    }
    if (confirmadas.length >= horario.cupoMaximo) {
      throw new CupoLlenoError(dto.horarioId, horario.cupoMaximo);
    }

    return this.repo.guardar({
      horarioId: dto.horarioId,
      miembroId: dto.miembroId,
    });
  }

  async cancelar(id: number): Promise<Inscripcion> {
    const cancelada = await this.repo.cancelar(id);
    if (cancelada === null) {
      throw new InscripcionNoEncontradaError(id);
    }
    return cancelada;
  }
}
