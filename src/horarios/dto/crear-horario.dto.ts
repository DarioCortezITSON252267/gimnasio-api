// El contrato de entrada del POST. No lleva id: ese lo pone el
// repositorio, no quien manda la peticion.
//
// OJO: esto es solo un tipo de TypeScript. Se borra al compilar, asi
// que NO valida nada en tiempo de ejecucion. Ver la pregunta 2 del
// README sobre que pasa si llega un claseId que no es numero.
export interface CrearHorarioDto {
  claseId: number;
  dia: string;
  horaInicio: string;
  cupoMaximo: number;
  entrenador: string;
}
