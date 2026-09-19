// La entidad Miembro. Es la misma forma que ya conocias de
// Inscripciones, pero vive aqui: cada modulo es dueno de su dominio.
export interface Miembro {
  id: number;
  nombre: string;
  correo: string;
  membresia: string;
  activo: boolean;
}

// Lo que hace falta para crear uno: nada de id ni de activo.
// El id lo pone el repositorio y `activo` nace en true.
// Es el mismo truco que NuevaInscripcion en la Practica 6.
export type NuevoMiembro = Omit<Miembro, 'id' | 'activo'>;

// Para actualizar: cualquier campo menos el id, y todos opcionales.
// El id identifica al miembro, no se cambia.
export type CambiosMiembro = Partial<Omit<Miembro, 'id'>>;
