import express, { Request, Response } from 'express'
import { KataController } from '../controllers/KataController'
import { logInfo } from '../utils/logger'
import { verifyToken } from '../middlewares/verify.middleware'
import bodyParser from 'body-parser'
import { IKata } from '../domain/interfaces/IKata.interface'

const jsonParser = bodyParser.json()

const kataRouter = express.Router()

kataRouter.route('/')
  //* GET
  .get(async (req:Request, res:Response) => {
    const id: any = req?.query?.id
    const limit: any = req?.query?.limit || 10
    const page: any = req?.query?.page || 1

    logInfo(`Query params: ${id}`)
    const controller: KataController = new KataController()

    const response = await controller.getKatas(limit, page, id)
    return res.status(200).send(response)
  })

  //* DELETE
  .delete(verifyToken, async (req: Request, res: Response) => {
    const id: any = req?.query?.id
    logInfo(`Query params: ${id}`)
    const controller: KataController = new KataController()

    const response = await controller.deleteKataById(id)
    res.status(200).send(response)
  })

  //* PUT
  .put(jsonParser, verifyToken, async (req: Request, res:Response) => {
    const id: any = req?.query?.id
    const { name, description, level, intents, stars, creator, solution, participants } = req.body

    if (creator) {
      const kata: IKata = {
        name,
        description,
        level,
        intents,
        stars,
        creator,
        solution,
        participants
      }

      const controller: KataController = new KataController()
      const response = await controller.updateKata(kata, id)

      return res.status(200).send(response)
    } else {
      res.status(400).send({
        message: 'Please enter the creator'
      })
    }
  })

  .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
    const { name, description, level, intents, stars, creator, solution, participants } = req.body

    if (name && description && level && intents && stars && creator && solution && participants) {
      const kata: IKata = {
        name,
        description,
        level,
        intents,
        stars,
        creator,
        solution,
        participants
      }

      const controller: KataController = new KataController()
      const response = await controller.createKata(kata)

      return res.status(200).send(response)
    } else {
      return res.status(400).send({
        message: '[ERROR Kata Data ] Insert data '
      })
    }
  })

export default kataRouter

/**
 * Get documents => 200 ok
 * Creation of document => 201 ok
 * Deletion of document => 200 (Entity) || 204 (no return)
 * Updating document => 200 (Entity) || 204 (no return)
 */
