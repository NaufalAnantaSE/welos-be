import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsArray, IsUrl } from 'class-validator';
import { KendaraanFeature } from '../enums/kendaraan-feature.enum';

export class CreateKendaraanDto {
    @IsString()
    name: string;

    @IsString()
    tipe: string;

    @IsNumber()
    tahun: number;

    @IsString()
    warna: string;

    @IsNumber()
    harga: number;

    @IsString()
    description: string;

    @IsArray()
    @IsEnum(KendaraanFeature, { each: true })
    fitur: KendaraanFeature[];



    @IsBoolean()
    IsHighlighted: boolean;

    @IsBoolean()
    IsAvailable: boolean;
}
