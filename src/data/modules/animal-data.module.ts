/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from 'src/data/animal/entities/animal.entity';
import { AnimalRepository } from 'src/data/animal/repositories/animal.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalEntity])],
  providers: [AnimalRepository],
  exports: [TypeOrmModule, AnimalRepository],
})
export class AnimalDataModule {}
