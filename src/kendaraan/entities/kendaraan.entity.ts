import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export enum FiturKendaraan {
    AC = "AC",
    BLUETOOTH_SPEAKER = "Bluetooth Speaker",
    USB_PORT = "USB Port",
    GPS = "GPS",
    KAMERA_BELAKANG = "Kamera Belakang",
    SENSOR_PARKIR = "Sensor Parkir",
    SUNROOF = "Sunroof"
}

@Entity('kendaraan')
export class KendaraanEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    tipe: string;

    @Column()
    tahun: number;

    @Column()
    warna: string;

    @Column()
    harga: number;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: FiturKendaraan,
        array: true
    })
    fitur: FiturKendaraan[];

    @Column()
    imageUrl: string;

    @Column({ default: false })
    IsHighlighted: boolean;

    @Column()
    IsAvailable: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt?: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt?: Date;
}
