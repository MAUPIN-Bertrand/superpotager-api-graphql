import { Test, TestingModule } from '@nestjs/testing';
import { PlantResolver } from './plant.resolver';
import { PlantService } from './plant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlantEntity } from './plant.entity';
import { Repository } from 'typeorm';

describe('PlantResolver', () => {
  let resolver: PlantResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantService,
        PlantResolver,
        {
          provide: getRepositoryToken(PlantEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<PlantResolver>(PlantResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
