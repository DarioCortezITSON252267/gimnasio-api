// El contrato de entrada del POST. Lo que NO esta aqui es lo
// importante: nada de id, y nada de activo. Eso lo decide el sistema,
// no quien manda la peticion.
export interface CrearMiembroDto {
  nombre: string;
  correo: string;
  membresia: string;
}
