import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'

// * Swagger ui
import SwaggerUi from 'swagger-ui-express'

//* Seguridad
import cors from 'cors'
import helmet from 'helmet'

// TODO: http

//* Rutas
import router from '../routes'

const server:Express = express()

//* Configuracion de Swaggwer

server.use(
  '/docs',
  SwaggerUi.serve,
  SwaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      explorer: true
    }
  })
)

//* Defino mi server para que use /api y que use todas las rutas de router
server.use('/api', router)

//* Server estatico
server.use(express.static('public'))

// TODO: mongoose conccion
mongoose.connect('mongodb://localhost:27017/codeverification')

//* Configuracion de seguridad
server.use(helmet())
server.use(cors())

//* Configuracion del tipop de contenido
server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

//* Redireccion
// http://localhost:8000/ ---> http://localhost:8000/
server.get('/', (req:Request, res:Response) => {
  res.redirect('/api')
})

export default server
