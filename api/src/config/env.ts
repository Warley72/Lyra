import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),

  PORT: z.coerce.number().default(3333),

  DATABASE_URL: z.string(),

  JWT_SECRET: z.string().min(32),

  JWT_EXPIRES_IN: z.string(),

  API_PREFIX: z.string().default('/api'),

  CORS_ORIGIN: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Variáveis de ambiente inválidas.");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
