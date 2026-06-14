import { env } from '@/infra/config/env'
import app from './app'

app.listen(env.SERVER_PORT, () => {
  console.log('🚀 Server Running')
})
