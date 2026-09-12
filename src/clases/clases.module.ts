import { Module } from '@nestjs/common';
import { ClasesService } from './clases.service.js';
import { ClasesController } from './clases.controller.js';

@Module({
  providers: [ClasesService],
  controllers: [ClasesController]
})
export class ClasesModule {}
