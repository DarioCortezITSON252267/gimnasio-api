// Los mismos campos del alta, todos opcionales: en una actualizacion
// parcial se manda solo lo que cambia.
export interface ActualizarHorarioDto {
  claseId?: number;
  dia?: string;
  horaInicio?: string;
  cupoMaximo?: number;
  entrenador?: string;
}
