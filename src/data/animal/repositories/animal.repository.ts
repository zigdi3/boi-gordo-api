import { InjectRepository } from '@nestjs/typeorm';
import { AnimalEntity as AnimalEntity } from '../entities/animal.entity';
import { Repository } from 'typeorm';

export class AnimalRepository {
  /**
   *
   */
  constructor(
    @InjectRepository(AnimalEntity)
    private animalRepository: Repository<AnimalEntity>,
  ) {}

  async registerAnimal(animal: AnimalEntity) {
    return await this.animalRepository.save(animal);
  }

  async updateAnimal(animal: AnimalEntity) {
    const tag = animal.farmTag;
    return await !!this.animalRepository.update(tag, animal);
  }

  async findAll() {
    const result = await this.animalRepository.find();
    return result;
  }

  async findAnimalByTag(tag: string) {
    const animal = await this.animalRepository.findOne({
      where: {
        farmTag: tag,
      },
    });
    return animal;
  }
}
