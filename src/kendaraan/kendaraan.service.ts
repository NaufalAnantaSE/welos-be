import { CreateKendaraanDto } from './dto/create-kendaraan.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FiturKendaraan } from './entities/kendaraan.entity';
import { KendaraanEntity } from './entities/kendaraan.entity';

@Injectable()
export class KendaraanService {
    constructor(
        @InjectRepository(KendaraanEntity)
        private readonly kendaraanRepository: Repository<KendaraanEntity>,
    ){}

    async CreateKendaraan(createKendaraanDto: CreateKendaraanDto): Promise<KendaraanEntity> {
        const kendaraan = this.kendaraanRepository.create({
            ...createKendaraanDto,
            fitur: createKendaraanDto.fitur as unknown as FiturKendaraan[],
        });
        return this.kendaraanRepository.save(kendaraan);
    }

    async GetAllKendaraan(): Promise<KendaraanEntity[]> {
        return await this.kendaraanRepository.find();
    }
}
