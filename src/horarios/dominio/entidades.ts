// La entidad Horario: una clase del gimnasio en un dia y una hora.
export interface Horario {
  id: number;
  claseId: number;
  dia: string;
  horaInicio: string;
  cupoMaximo: number;
  entrenador: string;
}

// Lo que hace falta para crear uno: todo menos el id, que lo pone el
// repositorio. Mismo patron que NuevoMiembro en la Practica 7.
export type NuevoHorario = Omit<Horario, 'id'>;

// Para actualizar: cualquier campo menos el id, y todos opcionales.
// El id identifica al horario, no se cambia.
export type CambiosHorario = Partial<Omit<Horario, 'id'>>;
