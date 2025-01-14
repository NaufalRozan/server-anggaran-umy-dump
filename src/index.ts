import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fjwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import { UserPayload } from './global'
import cors from '@fastify/cors'
import { serverRoutes } from './routes'
import { db } from './config/prisma'

const server = Fastify({})

server.register(import("@fastify/swagger"));
server.register(import("@fastify/swagger-ui"), {
    prefix: "/docs",
});

server.register(cors, {
    origin: ['http://localhost:3000', 'https://spmi.iqbalalhabib.com'],
    credentials: true,
})

server.ready(err => {
    if (err) throw err
    server.swagger()
})

server.register(fjwt, {
    secret: process.env.JWT_SECRET || 'supersecret'
})

server.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
        const token = request.cookies?.access_token
        const authHeader = request.headers.authorization

        if (!token && !authHeader) {
            return reply.status(401).send({ message: 'Authentication required' })
        }

        const jwtToken = token || authHeader?.split(' ')[1]

        if (!jwtToken) {
            return reply.status(401).send({ message: 'Invalid token' })
        }

        try {
            const decoded = request.jwt.verify(jwtToken) as UserPayload
            request.user = decoded
        } catch (e) {
            return reply.status(401).send({ message: 'Invalid or expired token' })
        }

    }
);

server.addHook('preHandler', (req, res, next) => {
    req.jwt = server.jwt
    next()
})

server.register(fCookie, {
    secret: process.env.COOKIE_SECRET || 'supersecret',
    hook: 'preHandler',
})

server.get('/', async (request, reply) => {
    return { hello: 'world' }
})

async function start() {
    serverRoutes(server)

    try {
        await server.listen({ port: 5000, host: '0.0.0.0' })
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

start()