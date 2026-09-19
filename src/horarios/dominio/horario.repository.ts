import type { CambiosHorario, Horario, NuevoHorario } from './entidades.js';

// Comparala contra MiembroRepository: es exactamente el mismo molde.
// Cinco metodos, todos devuelven Promise, y ni una palabra sobre HTTP,
// NestJS ni sobre donde viven los datos.
//
// Cambia el nombre de la entidad y nada mas. Eso es lo que significa
// que sea un patron: se repite igual sobre cualquier entidad.
export interface HorarioRepository {
  listar(): Promise<Horario[]>;
  buscarPorId(id: number): Promise<Horario | null>;
  crear(datos: NuevoHorario): Promise<Horario>;
  // Devuelven null cuando el id no existe. Traducir eso a un 404 es
  // trabajo del Controller: aqui no se conocen los codigos HTTP.
  actualizar(id: number, cambios: CambiosHorario): Promise<Horario | null>;
  eliminar(id: number): Promise<Horario | null>;
}
