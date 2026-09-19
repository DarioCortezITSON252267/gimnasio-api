import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { MiembrosService } from './miembros.service.js';
import type { Miembro } from './dominio/entidades.js';
import type { CrearMiembroDto } from './dto/crear-miembro.dto.js';
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto.js';

@Controller('miembros')
export class MiembrosController {
  // MiembrosService entra SIN token, y a proposito: es una clase, y una
  // clase sobrevive a la compilacion. Nest la usa como su propia llave.
  // El repositorio si necesito token porque era una interfaz.
  constructor(private readonly miembrosService: MiembrosService) {}

  // GET /miembros
  @Get()
  async listar(): Promise<Miembro[]> {
    return this.miembrosService.listar();
  }

  // GET /miembros/:id
  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number): Promise<Miembro> {
    const miembro = await this.miembrosService.buscar(id);
    // El Service devolvio null. Traducir eso a 404 es trabajo del
    // Controller: el dominio no conoce codigos HTTP.
    if (miembro === null) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return miembro;
  }

  // POST /miembros  ->  201 + cabecera Location
  @Post()
  async crear(
    @Body() cuerpo: Record<string, unknown> | undefined,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Miembro> {
    const dto = this.validarAlta(cuerpo);
    const creado = await this.miembrosService.crear(dto);
    res.setHeader('Location', `/miembros/${creado.id}`);
    return creado;
  }

  // PATCH /miembros/:id
  // PATCH y no PUT: se manda solo lo que cambia, no el miembro entero.
  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() cuerpo: Record<string, unknown> | undefined,
  ): Promise<Miembro> {
    const cambios = this.validarCambios(cuerpo);
    const actualizado = await this.miembrosService.actualizar(id, cambios);
    if (actualizado === null) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return actualizado;
  }

  // DELETE /miembros/:id
  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<Miembro> {
    const eliminado = await this.miembrosService.eliminar(id);
    if (eliminado === null) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return eliminado;
  }

  // -------------------------------------------------------------------
  //  La aduana. El cuerpo entra como datos sueltos, no como DTO: los
  //  tipos se borran al compilar y nadie garantiza que llegue bien.
  // -------------------------------------------------------------------
  private validarAlta(cuerpo: Record<string, unknown> | undefined): CrearMiembroDto {
    const faltan: string[] = [];
    const nombre = cuerpo?.['nombre'];
    const correo = cuerpo?.['correo'];
    const membresia = cuerpo?.['membresia'];

    if (!this.esTextoConContenido(nombre)) faltan.push('nombre');
    if (!this.esTextoConContenido(correo)) faltan.push('correo');
    if (!this.esTextoConContenido(membresia)) faltan.push('membresia');

    // Se juntan todos los faltantes antes de rechazar: si no, el
    // cliente tendria que mandar la peticion tres veces para enterarse
    // de las tres cosas que le faltan.
    if (faltan.length > 0) {
      throw new BadRequestException(
        `Faltan campos obligatorios o vienen vacios: ${faltan.join(', ')}`,
      );
    }

    return {
      nombre: nombre as string,
      correo: correo as string,
      membresia: membresia as string,
    };
  }

  private validarCambios(
    cuerpo: Record<string, unknown> | undefined,
  ): ActualizarMiembroDto {
    const cambios: ActualizarMiembroDto = {};
    const malos: string[] = [];

    // Aqui todo es opcional, asi que solo se revisa lo que SI vino.
    for (const campo of ['nombre', 'correo', 'membresia'] as const) {
      const valor = cuerpo?.[campo];
      if (valor === undefined) continue;
      if (!this.esTextoConContenido(valor)) {
        malos.push(campo);
        continue;
      }
      cambios[campo] = valor;
    }

    const activo = cuerpo?.['activo'];
    if (activo !== undefined) {
      if (typeof activo !== 'boolean') malos.push('activo');
      else cambios.activo = activo;
    }

    if (malos.length > 0) {
      throw new BadRequestException(`Campos con valor invalido: ${malos.join(', ')}`);
    }

    if (Object.keys(cambios).length === 0) {
      throw new BadRequestException('No se mando ningun campo para actualizar');
    }

    return cambios;
  }

  private esTextoConContenido(valor: unknown): valor is string {
    return typeof valor === 'string' && valor.trim() !== '';
  }
}
