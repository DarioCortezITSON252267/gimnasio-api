// El token de inyeccion del repositorio de miembros.
//
// MiembroRepository es una interfaz: desaparece al compilar y no queda
// nada en el archivo .js que Nest pueda usar como llave. Esta constante
// es un texto, y un texto si sobrevive. Ese es todo el truco, el mismo
// de INSCRIPCION_REPOSITORY en la Practica 6.
export const MIEMBRO_REPOSITORY = 'MIEMBRO_REPOSITORY';
