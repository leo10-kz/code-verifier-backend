import { Delete, Get, Put, Query, Route, Tags } from 'tsoa'
import { IUsersController } from './interfaces'
import { logSuccess, logWarning } from '../utils/logger'
import { getAllUsers, getUserById, deleteUserById, updateUser } from '../domain/orm/User.orm'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUsersController {
/**
* Endpoint que devuenlve la lista de usuarios de la BD
* @param {string} id opcional para buscar un usuario especifico
* @returns Todos los usuarios o uno en particular
*/

@Get('/')
  public async getUsers (@Query() id?: string): Promise<any> {
    let response: any = ''

    if (id) {
      logSuccess(`[api/usesr]: Get user by ID: ${id} `)
      response = await getUserById(id)
    } else {
      logSuccess('[api/usesr]: Get all users ')
      response = await getAllUsers()
    }

    return response
  }

/**
* Endpoint que borrara un usuario de la BD
* @param {string} id Id para identificar el usuario
* @returns Devolvera un mensaje si el Usuario se borro correctamente
*/
@Delete('/')
public async deleteUserById (@Query() id?: string): Promise<any> {
  let response: any = ''

  if (id) {
    logSuccess(`[api/usesr]: Delete User by ID: ${id}`)
    await deleteUserById(id).then(r => {
      response = {
        message: 'User deleted'
      }
    })
  } else {
    logWarning('[api/usesr]:  Delete User Request WITHOUT ID ')
    response = {
      message: 'Please, provide an ID to remove user for database'
    }
  }

  return response
}

@Put('/')
public async updateUser (user: any, @Query()id?: string) {
  let response: any = ''
  if (id) {
    logSuccess(`[api/usesr]: Delete User by ID: ${id}`)
    await updateUser(user, id).then(r => {
      response = {
        message: `User with ID:${id} updated successfully `
      }
    })
  } else {
    logWarning('[api/usesr]:  Update User Request WITHOUT ID ')
    response = {
      message: 'Please, provide an ID to update an existing user'
    }
  }

  return response
}
}
