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

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createKendaraanDto: CreateKendaraanDto,): Promise<KendaraanEntity> {
        return this.kendaraanService.CreateKendaraanDto(createKendaraanDto, file);
    }

    @Get()
    async findAll(): Promise<KendaraanEntity[]> {

        return this.kendaraanService.findAll();
    }
}