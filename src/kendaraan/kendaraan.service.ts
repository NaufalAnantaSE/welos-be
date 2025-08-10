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
        private readonly kendaraanRepository: Repository<KendaraanEntity>,
    ) { }

    /**
     * Membuat data kendaraan baru dengan mengunggah gambar.
     */
    async CreateKendaraanDto(
        createKendaraanDto: CreateKendaraanDto,
        file: Express.Multer.File, // Parameter file sekarang wajib
    ): Promise<KendaraanEntity> {
        if (!file) {
            // Pemeriksaan ini tetap baik untuk keamanan, meskipun controller sudah seharusnya memastikan
            throw new BadRequestException('File gambar wajib diunggah.');
        }

        try {
            // 1. Upload file ke ImageKit
            const uploadResponse = await imagekit.upload({
                file: file.buffer,
                fileName: `kendaraan-${Date.now()}-${file.originalname}`,
                folder: '/kendaraan_images', // Praktik baik: organisir file di ImageKit
            });

            // 2. Buat entitas baru tanpa mengubah DTO
            const kendaraanBaru = this.kendaraanRepository.create({
                ...createKendaraanDto, // Ambil semua data dari DTO
                // Pastikan fitur di-map ke enum yang benar jika ada perbedaan nama
                fitur: createKendaraanDto.fitur.map(f => FiturKendaraan[f as keyof typeof FiturKendaraan]),
                imageUrl: uploadResponse.url, // Tambahkan URL gambar dari hasil upload

            });

            // 3. Simpan ke database
            return this.kendaraanRepository.save(kendaraanBaru);

        } catch (error) {
            // 4. Tangani error dengan jelas
            console.error('Gagal membuat kendaraan:', error);
            throw new InternalServerErrorException('Terjadi kesalahan saat menyimpan data kendaraan.');
        }
    }

    /**
     * Mengambil semua data kendaraan.
     */
    async findAll(): Promise<KendaraanEntity[]> {
        return this.kendaraanRepository.find();
    }
}