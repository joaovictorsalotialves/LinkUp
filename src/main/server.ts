import { env } from '@/core/config/env'
import app from './app'

app.listen(env.SERVER_PORT, () => {
  console.log('🚀 Server Running')
})
