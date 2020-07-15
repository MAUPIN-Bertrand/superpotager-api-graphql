import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantResolver } from './plant.resolver';
import { PlantEntity } from './plant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlantEntity])],
  providers: [PlantService, PlantResolver],
  exports: [PlantService],
})
export class PlantModule {}
