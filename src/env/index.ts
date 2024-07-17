import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_LOCATIONIQ_KEY: z.string(),
});

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error(
    "❗ Invalid environment variables: ",
    _env.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
