import dotenv from 'dotenv'
import server from './src/servers'
import { logSuccess, logError } from './src/utils/logger'

// Configuration the .env file
dotenv.config()
const port = process.env.PORT || 8000

server.listen(port, () => {
  logSuccess(`[SERVER on] : http://localhost:${port}/api`)
})

//* En cason de error
server.on('error', (error) => {
  logError(`[SERVER error]: ${error}`)
})
