import { Horario, Inscripcion, Miembro, NuevaInscripcion } from './entidades.js';

export interface InscripcionRepository {
  listar(): Promise<Inscripcion[]>;
  buscarPorId(id: number): Promise<Inscripcion | null>;
  buscarPorHorario(horarioId: number): Promise<Inscripcion[]>;
  buscarHorario(horarioId: number): Promise<Horario | null>;
  buscarMiembro(miembroId: number): Promise<Miembro | null>;
  guardar(datos: NuevaInscripcion): Promise<Inscripcion>;
  cancelar(id: number): Promise<Inscripcion | null>;
}
export const INSCRIPCION_REPOSITORY = 'INSCRIPCION_REPOSITORY';
