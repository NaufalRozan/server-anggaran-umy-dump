import { db } from "../../config/prisma";


class PembelianRepository {
    static async Insert(
        rekeningId: string,
        prokerId: string,
        uraian: string,
        satuan: string,
        jumlah: number,
        nilaiSatuan: number,
        kuantitas: string,
        paguId: string,
        creatorId?: string,
    ) {
        return db.pembelian.create({
            data: {
                rekeningId,
                prokerId,
                uraian,
                satuan,
                jumlah,
                nilaiSatuan,
                kuantitas,
                paguId,
            }
        })
    }

    static async FindAll() {
        return db.pembelian.findMany({
            include: {
                rekening: true,
                pagu: true,
                ma_to_indicator: true
            }
        })
    }

    static async FindByMaId(prokerId: string) {
        return db.pembelian.findMany({
            where: { prokerId }
        })
    }

    static async FindOne(id: string) {
        return db.pembelian.findUnique({
            where: { id }
        })
    }

    static async Update(
        id: string,
        rekeningId: string,
        prokerId: string,
        uraian: string,
        satuan: string,
        jumlah: number,
        nilaiSatuan: number,
        kuantitas: string,
    ) {
        return db.pembelian.update({
            where: { id },
            data: {
                rekeningId,
                prokerId,
                uraian,
                satuan,
                jumlah,
                nilaiSatuan,
                kuantitas,
            }
        })
    }

    static async Delete(id: string) {
        return db.pembelian.delete({
            where: { id }
        })
    }
}

export default PembelianRepository;