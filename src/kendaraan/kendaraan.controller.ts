import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { KendaraanService } from './kendaraan.service';
import { CreateKendaraanDto } from './dto/create-kendaraan.dto';

@Controller('kendaraan')
export class KendaraanController {
    constructor(
        private readonly kendaraanService: KendaraanService
    ) { }

    @Post('create-kendaraan')
    @HttpCode(HttpStatus.CREATED)
    async createKendaraan(@Body() createKendaraanDto: CreateKendaraanDto): Promise<any> {
        return this.kendaraanService.CreateKendaraan(createKendaraanDto);
    }

    @Get('get-all-kendaraan')
    async getAllKendaraan(): Promise<any> {
        return await this.kendaraanService.GetAllKendaraan();
    }
}
