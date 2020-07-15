import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GardenService } from './garden.service';
import { GardenResolver } from './garden.resolver';
import { GardenEntity } from './garden.entity';
import { UserModule } from '../user/user.module';
import { PlantModule } from '../plant/plant.module';

@Module({
  imports: [
    PlantModule,
    TypeOrmModule.forFeature([GardenEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [GardenService, GardenResolver],
  exports: [GardenService],
})
export class GardenModule {}
