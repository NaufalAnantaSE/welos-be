import { Module } from '@nestjs/common';
import { KendaraanService } from './kendaraan.service';
import { KendaraanController } from './kendaraan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KendaraanEntity } from './entities/kendaraan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([KendaraanEntity]),
  ],
  providers: [KendaraanService],
  controllers: [KendaraanController]
})
export class KendaraanModule {}
