import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { imagekit } from 'src/config/imagekit.config';
import { KendaraanEntity } from './entities/kendaraan.entity';
import { CreateKendaraanDto } from './dto/create-kendaraan.dto';
import { FiturKendaraan } from './entities/kendaraan.entity';

@Injectable()
export class KendaraanService {
    constructor(
        @InjectRepository(KendaraanEntity)
        private readonly kendaraanRepository: Repository<KendaraanEntity>,) { }

    async CreateKendaraanDto(
        createKendaraanDto: CreateKendaraanDto,
        file: Express.Multer.File): Promise<KendaraanEntity> {
        if (!file) {
            
            throw new BadRequestException('File gambar wajib diunggah.');
        }

        try {
            
            const uploadResponse = await imagekit.upload({
                file: file.buffer,
                fileName: `kendaraan-${Date.now()}-${file.originalname}`,
                folder: '/kendaraan_images', 
            });

            
            const kendaraanBaru = this.kendaraanRepository.create({
                ...createKendaraanDto, 
                
                fitur: createKendaraanDto.fitur.map(f => FiturKendaraan[f as keyof typeof FiturKendaraan]),
                imageUrl: uploadResponse.url, 

            });
            return this.kendaraanRepository.save(kendaraanBaru);

        } catch (error) {
            
            console.error('Gagal membuat kendaraan:', error);
            throw new InternalServerErrorException('Terjadi kesalahan saat menyimpan data kendaraan.');
        }
    }

    async findAll(): Promise<KendaraanEntity[]> {
        return this.kendaraanRepository.find();
    }
}