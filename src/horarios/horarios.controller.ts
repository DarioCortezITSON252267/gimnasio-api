import {
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
import { HorariosService } from './horarios.service.js';
import type { Horario } from './dominio/entidades.js';
import type { CrearHorarioDto } from './dto/crear-horario.dto.js';
import type { ActualizarHorarioDto } from './dto/actualizar-horario.dto.js';

@Controller('horarios')
export class HorariosController {
  // HorariosService entra SIN token, y a proposito: es una clase, y una
  // clase sobrevive a la compilacion. Nest la usa como su propia llave.
  // El repositorio si necesito token porque era una interfaz.
  constructor(private readonly horariosService: HorariosService) {}

  // GET /horarios
  @Get()
  async listar(): Promise<Horario[]> {
    return this.horariosService.listar();
  }

  // GET /horarios/:id
  //
  // ParseIntPipe si revisa en tiempo de ejecucion: convierte el texto
  // de la URL a numero y, si no puede, responde 400 el solito.
  // Comparalo con el @Body() de abajo, que no tiene ninguna revision.
  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number): Promise<Horario> {
    const horario = await this.horariosService.buscar(id);
    // El Service devolvio null. Traducirlo a 404 es trabajo del
    // Controller: el dominio no conoce codigos HTTP.
    if (horario === null) {
      throw new NotFoundException(`No existe el horario ${id}`);
    }
    return horario;
  }

  // POST /horarios  ->  201 + cabecera Location
  //
  // ATENCION, aqui esta el punto de la pregunta 2 del README:
  // `CrearHorarioDto` es solo un tipo de TypeScript. Se borra al
  // compilar. En el archivo .js no queda ninguna revision, asi que si
  // llega { "claseId": "uno" } entra tal cual y responde 201.
  // Se deja asi a proposito, para ver el hueco. La forma de taparlo es
  // un ValidationPipe con class-validator.
  @Post()
  async crear(
    @Body() dto: CrearHorarioDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Horario> {
    const creado = await this.horariosService.crear(dto);
    res.setHeader('Location', `/horarios/${creado.id}`);
    return creado;
  }

  // PATCH /horarios/:id
  // PATCH y no PUT: se manda solo lo que cambia, no el horario entero.
  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() cambios: ActualizarHorarioDto,
  ): Promise<Horario> {
    const actualizado = await this.horariosService.actualizar(id, cambios);
    if (actualizado === null) {
      throw new NotFoundException(`No existe el horario ${id}`);
    }
    return actualizado;
  }

  // DELETE /horarios/:id
  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<Horario> {
    const eliminado = await this.horariosService.eliminar(id);
    if (eliminado === null) {
      throw new NotFoundException(`No existe el horario ${id}`);
    }
    return eliminado;
  }
}
