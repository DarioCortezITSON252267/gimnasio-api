import type { CambiosMiembro, Miembro, NuevoMiembro } from './entidades.js';

// Comparala contra InscripcionRepository de la Practica 6: es el mismo
// molde. Una interfaz con metodos que devuelven Promise, y ni una sola
// palabra sobre COMO se guardan los datos.
//
// Lo que esta interfaz NO dice:
//   - no dice Express ni NestJS: no sabe que la llaman por HTTP
//   - no dice Map, arreglo ni MySQL: no sabe donde viven los datos
//
// Dice QUE se puede hacer, nunca COMO. Por eso el mismo contrato lo
// puede cumplir un arreglo hoy y Prisma la semana que viene.
export interface MiembroRepository {
  listar(): Promise<Miembro[]>;
  buscarPorId(id: number): Promise<Miembro | null>;
  crear(datos: NuevoMiembro): Promise<Miembro>;
  // Devuelven null cuando el id no existe: el que llama decide que
  // hacer con eso. El dominio no sabe que existe el codigo 404.
  actualizar(id: number, cambios: CambiosMiembro): Promise<Miembro | null>;
  eliminar(id: number): Promise<Miembro | null>;
}
