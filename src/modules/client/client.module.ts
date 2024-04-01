import { ClientService } from './client.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../../data/client/entities/client.entity';
import { ClientController } from './client.controller';
import { ClientRepository } from 'src/data/client/repositories/client.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [TypeOrmModule, ClientService, ClientRepository],
})
export class ClientModule {}
