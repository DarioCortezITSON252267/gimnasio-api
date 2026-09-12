@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}
  @Get()
  async listar(): Promise<InscripcionResponseDto[]> {
    const inscripciones = await this.inscripcionesService.listar();
    return inscripciones.map(aInscripcionDto);
  }

  @Post()
  async crear(
    @Body() cuerpo: Record<string, unknown> | undefined,
    @Res({ passthrough: true }) res: Response,
  ): Promise<InscripcionResponseDto> {
    const dto = this.validar(cuerpo);

    try {
      const creada = await this.inscripcionesService.crear(dto);
      res.setHeader('Location', `/inscripciones/${creada.id}`);
      return aInscripcionDto(creada);
    } catch (e) {
      throw this.aErrorHttp(e);
    }
  }

  @Delete(':id')
  async cancelar(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InscripcionResponseDto> {
    try {
      const cancelada = await this.inscripcionesService.cancelar(id);
      return aInscripcionDto(cancelada);
    } catch (e) {
      throw this.aErrorHttp(e);
    }
  }

  private validar(cuerpo: Record<string, unknown> | undefined): CrearInscripcionDto {
    const faltan: string[] = [];
    const horarioId = cuerpo?.['horarioId'];
    const miembroId = cuerpo?.['miembroId'];

    if (typeof horarioId !== 'number') faltan.push('horarioId');
    if (typeof miembroId !== 'number') faltan.push('miembroId');

    if (faltan.length > 0) {
      throw new BadRequestException(
        `Faltan campos obligatorios o no son numeros: ${faltan.join(', ')}`,
      );
    }

    return { horarioId: horarioId as number, miembroId: miembroId as number };
  }
  private aErrorHttp(e: unknown): Error {
    if (
      e instanceof HorarioNoEncontradoError ||
      e instanceof MiembroNoEncontradoError ||
      e instanceof InscripcionNoEncontradaError
    ) {
      return new NotFoundException(e.message);
    }
    if (e instanceof CupoLlenoError || e instanceof InscripcionDuplicadaError) {
      return new ConflictException(e.message);
    }
    return e instanceof Error ? e : new Error('Error desconocido');
  }
}
