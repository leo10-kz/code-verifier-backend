import express, { Request, Response } from 'express'
import { UserController } from '../controllers/UserController'
import { logInfo } from '../utils/logger'

const userRouter = express.Router()

userRouter.route('/')
  // GET
  .get(async (req:Request, res:Response) => {
    const id: any = req?.query?.id
    logInfo(`Query params: ${id}`)
    const controller: UserController = new UserController()

    const response = await controller.getUsers(id)
    return res.send(response)
  })
  // DELETE
  .delete(async (req: Request, res: Response) => {
    const id: any = req?.query?.id
    logInfo(`Query params: ${id}`)
    const controller: UserController = new UserController()

    const response = await controller.deleteUserById(id)
    res.send(response)
  })
  // POST
  .post(async (req: Request, res: Response) => {
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age

    const user = {
      name: name || 'default',
      email: email || 'defaul email',
      age: age || 30
    }

    const controller: UserController = new UserController()
    const response = await controller.createUser(user)

    res.send(response)
  })
  // PUT
  .put(async (req: Request, res:Response) => {
    const id: any = req?.query?.id
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age
    logInfo(`Query params: ${id}, ${name}, ${email}, ${age}`)

    const user = {
      name,
      email,
      age
    }

    const controller: UserController = new UserController()
    const response = await controller.updateUser(user, id)

    res.send(response)
  })

export default userRouter
