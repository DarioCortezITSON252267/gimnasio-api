import { Injectable } from '@nestjs/common';

/** Una clase del gimnasio: identificador y nombre. */
export interface Clase {
  id: number;
  nombre: string;
}

@Injectable()
export class ClasesService {
  private readonly clases: Clase[] = [
    { id: 1, nombre: 'Spinning' },
    { id: 2, nombre: 'Yoga' },
    { id: 3, nombre: 'Box' },
  ];

  listar(): Clase[] {
    return this.clases;
  }

  crear(clase: Clase): Clase {
    this.clases.push(clase);
    return clase;
  }
}
