import { DataSource, Repository, UpdateResult } from 'typeorm';
import { ClientEntity } from '../entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ClientRepository {
  /**
   *
   */
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async createClient(client: ClientEntity) {
    return await this.clientRepository.save(client);
  }
  async findClient(id: string) {
    return await this.clientRepository.findOneBy({ id });
  }
  async findByEmail(email: string) {
    return await this.clientRepository.findOneBy({ email });
  }
  async refreshToken(id: string, refreshToken: string): Promise<UpdateResult> {
    return await this.clientRepository.update({ id }, { refreshToken });
  }

  async logout(id: string): Promise<UpdateResult> {
    return await this.clientRepository.update({ id }, { refreshToken: null });
  }
}
