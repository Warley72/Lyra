import { FastifyInstance } from "fastify";

export async function routes(app: FastifyInstance) {
    app.get("/health", async (_request, reply) => {
        return reply.status(200).send({
            status: "sinal que deu certo aqui",
        });
    });
}
