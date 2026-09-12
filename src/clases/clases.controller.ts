import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClasesService, type Clase } from './clases.service.js';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get()
  listar(): Clase[] {
    return this.clasesService.listar();
  }

  @Post()
  crear(@Body() clase: Clase): Clase {
    return this.clasesService.crear(clase);
  }
}
