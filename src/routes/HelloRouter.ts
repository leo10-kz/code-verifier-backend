import express, { Request, Response } from 'express'
import { HelloController } from '../controllers/HelloController'
import { logInfo } from '../utils/logger'

const helloRouter = express.Router()

helloRouter.route('/')
  .get(async (req:Request, res:Response) => {
    // Obtengo  el name del query params

    const name: any = req?.query?.name
    logInfo(`query: ${name}`)

    // Creo una instacia de HelloController

    const controller = new HelloController()

    // Obtengo la respuesta

    const response = await controller.getMessage(name)

    return res.send(response)
  })

export default helloRouter
