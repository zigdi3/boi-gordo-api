/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/entities/client.entity';
import { ClientRepository } from '../client/repositories/client.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [ClientRepository],
  exports: [TypeOrmModule, ClientRepository],
})
export class ClientDataModule {}
