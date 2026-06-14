import { defineConfig } from 'drizzle-kit'
import { env } from './src/infra/config/env'

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './src/infra/database/drizzle/schemas/**.ts',
  out: './src/core/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
