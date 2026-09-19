import { Injectable } from '@nestjs/common';
import type { CambiosMiembro, Miembro, NuevoMiembro } from '../dominio/entidades.js';
import type { MiembroRepository } from '../dominio/miembro.repository.js';

// La palabra clave es `implements`: ahi esta la promesa de cumplir la
// interfaz. Si manana le falta un metodo o cambia una firma, el
// compilador reclama en ESTA linea, antes de que nadie ejecute nada.
//
// El dia que exista MiembroPrismaRepository, va a decir `implements
// MiembroRepository` igual que esta, y nadie mas se entera del cambio.
@Injectable()
export class MiembroMemoriaRepository implements MiembroRepository {
  // Los mismos tres miembros que ya conoces de Inscripciones, pero en
  // un arreglo propio de este modulo.
  private miembros: Miembro[] = [
    { id: 1, nombre: 'Karla Duarte', correo: 'karla@itson.mx', membresia: 'premium', activo: true },
    { id: 2, nombre: 'Omar Valdez', correo: 'omar@itson.mx', membresia: 'plus', activo: true },
    { id: 3, nombre: 'Sofia Ibarra', correo: 'sofia@itson.mx', membresia: 'basica', activo: true },
  ];

  private siguienteId = 4;

  async listar(): Promise<Miembro[]> {
    return this.miembros;
  }

  async buscarPorId(id: number): Promise<Miembro | null> {
    return this.miembros.find((m) => m.id === id) ?? null;
  }

  async crear(datos: NuevoMiembro): Promise<Miembro> {
    // El id y el estado los pone el repositorio, no quien llama.
    const nuevo: Miembro = {
      id: this.siguienteId++,
      nombre: datos.nombre,
      correo: datos.correo,
      membresia: datos.membresia,
      activo: true,
    };
    this.miembros.push(nuevo);
    return nuevo;
  }

  async actualizar(id: number, cambios: CambiosMiembro): Promise<Miembro | null> {
    const miembro = this.miembros.find((m) => m.id === id);
    if (!miembro) return null;

    // Solo se pisan los campos que vinieron. Los que no, se quedan.
    if (cambios.nombre !== undefined) miembro.nombre = cambios.nombre;
    if (cambios.correo !== undefined) miembro.correo = cambios.correo;
    if (cambios.membresia !== undefined) miembro.membresia = cambios.membresia;
    if (cambios.activo !== undefined) miembro.activo = cambios.activo;

    return miembro;
  }

  async eliminar(id: number): Promise<Miembro | null> {
    const indice = this.miembros.findIndex((m) => m.id === id);
    if (indice === -1) return null;

    // splice devuelve un arreglo con lo que saco.
    const [eliminado] = this.miembros.splice(indice, 1);
    return eliminado ?? null;
  }
}
