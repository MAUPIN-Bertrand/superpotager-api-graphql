import { Test, TestingModule } from '@nestjs/testing';
import { GardenService } from './garden.service';
import { PlantService } from '../plant/plant.service';

describe('GardenService', () => {
  let service: GardenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GardenService, PlantService],
    }).compile();

    service = module.get<GardenService>(GardenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
