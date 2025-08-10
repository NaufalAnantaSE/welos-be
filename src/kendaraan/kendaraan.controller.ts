import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { KendaraanService } from './kendaraan.service';
import { CreateKendaraanDto } from './dto/create-kendaraan.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { KendaraanEntity } from './entities/kendaraan.entity';

@Controller('kendaraan')
export class KendaraanController {
    constructor(
        private readonly kendaraanService: KendaraanService
    ) { }

    // 1. Tambahkan decorator @Post() untuk mendefinisikan endpoint
    @Post()
    // 2. Gunakan HttpCode untuk response status yang sesuai (201 Created)
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('image')) // 'image' adalah nama field di form-data
    async create(
        // 3. Tambahkan validasi untuk file jika diperlukan (lihat catatan)
        @UploadedFile() file: Express.Multer.File,
        @Body() createKendaraanDto: CreateKendaraanDto,
    ): Promise<KendaraanEntity> {
        // 4. Panggil method 'create' yang benar dari service
        return this.kendaraanService.CreateKendaraanDto(createKendaraanDto, file);
    }

    // 5. Gunakan @Get() tanpa path tambahan untuk endpoint "get all"
    @Get()
    async findAll(): Promise<KendaraanEntity[]> {
        // Panggil method 'findAll' yang sesuai dari service
        return this.kendaraanService.findAll();
    }
}