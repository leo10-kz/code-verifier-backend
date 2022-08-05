import express, { Request, Response } from 'express'
import { logInfo } from '../utils/logger'
import authRouter from './AuthRouter'
import helloRouter from './HelloRouter'
import userRouter from './UserRouter'
import kataRouter from './KataRouter'

// Creo una instancia del server con express
const server = express()

// Creo una instancia del Router con express
const rootRouter = express.Router()

// GET: http://localhost:8000/api/
rootRouter.get('/', (req:Request, res:Response) => {
  logInfo(' http://localhost:8000/api/')
  res.status(200).json({ data: { message: 'Goodbye world' } })
})

// Redireccion derutas y controllers
server.use('/', rootRouter) // http://localhost:8000/api/
server.use('/hello', helloRouter) // http://localhost:8000/api/hello
server.use('/users', userRouter) // http://localhost:8000/api/users
server.use('/auth', authRouter) // http://localhost:8000/api/auth
server.use('/katas', kataRouter) // http://localhost:8000/api/katas

export default server
