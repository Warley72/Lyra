import { app } from "./app.js";

const PORT = 3333;

const start = async () => {
    try {
        await app.listen({
            port: PORT,
            host: "0.0.0.0",
        });

        console.log(` Rodando no portal http://localhost:${PORT}`);
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();
