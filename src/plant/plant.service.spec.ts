import { Test, TestingModule } from '@nestjs/testing';
import { PlantService } from './plant.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlantEntity } from './plant.entity';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import { NotFoundException } from '@nestjs/common';

function GetPlantEntity(): PlantEntity {
  const result = new PlantEntity();
  result.id = faker.random.uuid();
  result.name = faker.random.word();
  result.icon = faker.random.word();
  return result;
}

describe('PlantService', () => {
  let service: PlantService;
  let repository: Repository<PlantEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantService,
        {
          provide: getRepositoryToken(PlantEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PlantService>(PlantService);
    repository = module.get<Repository<PlantEntity>>(
      getRepositoryToken(PlantEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPlants', () => {
    it('should return an array of plants', async () => {
      const results: PlantEntity[] = [GetPlantEntity()];
      jest.spyOn(repository, 'find').mockImplementation(async () => results);

      expect(await service.getAllPlants()).toBe(results);
    });
  });

  describe('deletePlantById', () => {
    it('should return the deleted plant', async () => {
      const result: PlantEntity = GetPlantEntity();
      jest.spyOn(repository, 'findOne').mockImplementation(async () => result);
      jest.spyOn(repository, 'remove').mockImplementation(async () => result);

      expect(await service.deletePlantById(result.id)).toBe(result);
    });
    it('should throw exception if id is not found', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(async () => null);

      expect(await service.deletePlantById('')).toThrowError(NotFoundException);
    });
  });

  describe('getPlantById', () => {
    it('should return the searched plant', async () => {
      const result: PlantEntity = GetPlantEntity();
      jest.spyOn(repository, 'findOne').mockImplementation(async () => result);

      expect(await service.getPlantById(result.id)).toBe(result);
    });
    it('should throw exception if id is not found', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(async () => null);

      expect(await service.getPlantById('')).toThrowError(NotFoundException);
    });
  });
});
