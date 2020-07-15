import { Test, TestingModule } from '@nestjs/testing';
import { GardenResolver } from './garden.resolver';

describe('GardenResolver', () => {
  let resolver: GardenResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GardenResolver],
    }).compile();

    resolver = module.get<GardenResolver>(GardenResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
