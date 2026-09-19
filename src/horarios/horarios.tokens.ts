// El token de inyeccion del repositorio de horarios.
//
// HorarioRepository es una interfaz: desaparece al compilar y no queda
// nada en el .js que Nest pueda usar como llave. Esta constante es un
// texto, y un texto si sobrevive. Mismo truco que MIEMBRO_REPOSITORY.
export const HORARIO_REPOSITORY = 'HORARIO_REPOSITORY';
