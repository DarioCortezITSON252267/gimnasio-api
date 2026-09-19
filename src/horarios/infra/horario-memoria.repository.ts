import { Injectable } from '@nestjs/common';
import type { CambiosHorario, Horario, NuevoHorario } from '../dominio/entidades.js';
import type { HorarioRepository } from '../dominio/horario.repository.js';

// `implements` es la promesa de cumplir la interfaz. Si falta un
// metodo o una firma no coincide, el compilador reclama en esta linea.
@Injectable()
export class HorarioMemoriaRepository implements HorarioRepository {
  // Los mismos horarios de ejemplo que ya conoces de Inscripciones,
  // pero en un arreglo propio de este modulo.
  private horarios: Horario[] = [
    { id: 1, claseId: 1, dia: 'lunes', horaInicio: '07:00', cupoMaximo: 2, entrenador: 'Ana Robles' },
    { id: 2, claseId: 1, dia: 'miercoles', horaInicio: '07:00', cupoMaximo: 3, entrenador: 'Ana Robles' },
    { id: 3, claseId: 2, dia: 'martes', horaInicio: '19:00', cupoMaximo: 4, entrenador: 'Luis Fierro' },
  ];

  private siguienteId = 4;

  async listar(): Promise<Horario[]> {
    return this.horarios;
  }

  async buscarPorId(id: number): Promise<Horario | null> {
    return this.horarios.find((h) => h.id === id) ?? null;
  }

  async crear(datos: NuevoHorario): Promise<Horario> {
    // El id lo pone el repositorio, no quien llama.
    const nuevo: Horario = {
      id: this.siguienteId++,
      claseId: datos.claseId,
      dia: datos.dia,
      horaInicio: datos.horaInicio,
      cupoMaximo: datos.cupoMaximo,
      entrenador: datos.entrenador,
    };
    this.horarios.push(nuevo);
    return nuevo;
  }

  async actualizar(id: number, cambios: CambiosHorario): Promise<Horario | null> {
    const horario = this.horarios.find((h) => h.id === id);
    if (!horario) return null;

    // Solo se pisan los campos que vinieron. Los demas se quedan.
    if (cambios.claseId !== undefined) horario.claseId = cambios.claseId;
    if (cambios.dia !== undefined) horario.dia = cambios.dia;
    if (cambios.horaInicio !== undefined) horario.horaInicio = cambios.horaInicio;
    if (cambios.cupoMaximo !== undefined) horario.cupoMaximo = cambios.cupoMaximo;
    if (cambios.entrenador !== undefined) horario.entrenador = cambios.entrenador;

    return horario;
  }

  async eliminar(id: number): Promise<Horario | null> {
    const indice = this.horarios.findIndex((h) => h.id === id);
    if (indice === -1) return null;

    const [eliminado] = this.horarios.splice(indice, 1);
    return eliminado ?? null;
  }
}
