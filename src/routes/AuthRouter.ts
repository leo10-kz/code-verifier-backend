import express, { Request, Response } from 'express'
import { AuthController } from '../controllers/AuthController'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'
import { verifyToken } from '../middlewares/verify.middleware'

const jsonParser = bodyParser.json()
const authRouter = express.Router()

authRouter.route('/register')
  .post(jsonParser, async (req: Request, res: Response) => {
    const { name, email, password, age } = req.body

    if (name && email && password && age) {
      const hasPassword = bcrypt.hashSync(password, 8)
      const user: IUser = {
        name,
        email,
        password: hasPassword,
        age
      }

      const controller: AuthController = new AuthController()
      const response = await controller.registerUser(user)

      res.status(201).send(response)
    } else {
      return res.status(400).send({
        message: '[ERROR User Data missing] No user can be registered '
      })
    }
  })

authRouter.route('/login')
  .post(jsonParser, async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (email && password) {
      const constroller: AuthController = new AuthController()

      const auth: IAuth = {
        email,
        password
      }

      const response = await constroller.loginUser(auth)

      res.status(201).send(response)
    } else {
      return res.status(400).send({
        message: '[ERROR User Data missing] No user can be registered '
      })
    }
  })

authRouter.route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    const id: any = req.query.id

    if (id) {
      const controller: AuthController = new AuthController()
      const response = await controller.userData(id)

      res.status(200).send(response)
    } else {
      return res.status(401).send({
        message: 'You are not authorised to perform this action'
      })
    }
  })

export default authRouter
