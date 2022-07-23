import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'
import { Post, Route, Tags, Get, Query } from 'tsoa'
import { logSuccess, logWarning } from '../utils/logger'
import { IAuthController } from './interfaces'
import { registerUser, loginUser, getUserById } from '../domain/orm/User.orm'
import { AuthResponse, ErrorResponse } from './types'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser (user: IUser): Promise<any> {
    let response: any = ''

    if (user) {
      logSuccess(`[/auth/register] Register new User: ${user.email}`)
      await registerUser(user).then(r => {
        logSuccess(`[/auth/register] Create user: ${user.email}`)
        response = {
          message: `User created successfully: ${user.name}`
        }
      })
    } else {
      logWarning('[/auth/register] Register needs User Entity')
      response = {
        message: 'Please, provide a User Entity to create one'
      }
    }
    return response
  }

  @Post('/login')
  public async loginUser (auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse

    if (auth) {
      logSuccess(`[/auth/login] Register new User: ${auth.email}`)
      const data = await loginUser(auth)

      response = {
        token: data.token,
        message: `Welcome ${data.user.name}`
      }
    } else {
      logWarning('[/auth/login] Register needs Auth Entity(email && password)')
      response = {
        error: '[AUTH ERROR]: Email && Password are needed ',
        message: 'Please, provide email && password to login'
      }
    }
    return response
  }

  /**
* Endpoint que devuenlve el usuario solicitado por ID
* Middleware : Validacion JWT
* Valida que en el Header venga un Token
* @param {string} id opcional para buscar un usuario especifico
* @returns Todos los usuarios o uno en particular
*/

@Get('/me')
  public async userData (@Query() id: string): Promise<any> {
    let response: any = ''

    if (id) {
      logSuccess(`[api/usesr]: Get user by ID: ${id} `)
      response = await getUserById(id)
    }

    return response
  }
}
