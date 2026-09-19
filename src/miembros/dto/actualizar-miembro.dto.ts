// Los mismos campos del alta, pero todos opcionales, mas `activo`.
// Opcionales porque en una actualizacion parcial se manda solo lo que
// cambia. Y `activo` si aparece aqui: dar de baja a un miembro es una
// actualizacion, no un alta.
export interface ActualizarMiembroDto {
  nombre?: string;
  correo?: string;
  membresia?: string;
  activo?: boolean;
}
