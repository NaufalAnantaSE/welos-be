import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KendaraanModule } from './kendaraan/kendaraan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        // Opsi ini sangat penting untuk produksi!
        synchronize: true,
        ssl: {
          rejectUnauthorized: false, // Diperlukan untuk NeonDB
        },
      }),
    }),

    UserModule,

    KendaraanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
