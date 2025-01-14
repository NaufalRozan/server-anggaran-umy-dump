import KpiRepository from "../indikator-kinerja/kpi.repository";
import LaporanRepository from "./laporan.repository";
import { CreateLaporanInput } from "./laporan.schema";

class LaporanService {
    static async createLaporan(
        inputDataLaporan: CreateLaporanInput
    ) {
        const indicator = await KpiRepository.FindOne(inputDataLaporan.indikatorId);
        if (!indicator) {
            throw new Error("Indikator tidak ditemukan");
        }

        return LaporanRepository.Insert(inputDataLaporan)
    }

    static async findAllLaporan(
        year?: string,
        indicatorId?: string) {
        return LaporanRepository.FindAll(
            year,
            indicatorId
        )
    }

    static async deleteLaporan(id: string) {
        return LaporanRepository.Delete(id)
    }
}

export default LaporanService;