import { FastifyInstance } from "fastify";
import { createLaporanHandler, deleteLaporanHandler, findAllLaporanHandler } from "./laporan.controller";
import { $ref } from "./laporan.schema";

export async function laporanRoutes(server: FastifyInstance) {
    server.get(
        "/",
        {
            schema: {
                tags: ["Laporan"],
            },
            preHandler: [server.authenticate]
        },
        findAllLaporanHandler
    )

    server.post(
        "/",
        {
            schema: {
                tags: ["Laporan"],
                body: $ref("createLaporanSchema"),
            },
            preHandler: [server.authenticate]
        },
        createLaporanHandler
    )

    server.delete(
        "/:id",
        {
            schema: {
                tags: ["Laporan"],
            },
            preHandler: [server.authenticate]
        },
        deleteLaporanHandler
    )
}