import { FastifyInstance } from "fastify";
import { createLaporanHandler, deleteLaporanHandler, findAllLaporanHandler, findOneLaporanHandler, updateLaporanHandler } from "./laporan.controller";
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

    server.put(
        "/:id",
        {
            schema: {
                tags: ["Laporan"],
                body: $ref("createLaporanSchema"),
            },
            preHandler: [server.authenticate]
        },
        updateLaporanHandler
    )

    server.get(
            "/:id",
            {
                schema: {
                    tags: ["Laporan"],
                },
                preHandler: [server.authenticate]
            },
            findOneLaporanHandler
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