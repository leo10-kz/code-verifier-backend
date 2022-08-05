import { Delete, Get, Post, Put, Query, Route, Tags } from 'tsoa'
import { IKataController } from './interfaces'
import { logSuccess, logWarning } from '../utils/logger'
import { getAllKatas, getKataById, deleteKataById, createKata, updateKata } from '../domain/orm/Kata.orm'
import { IKata } from '../domain/interfaces/IKata.interface'

@Route('/api/katas')
@Tags('KataController')
export class KataController implements IKataController {
  /**
* Endpoint que devuelve la lista de katas de la BD
* @param {string} id opcional para buscar una kata especifica
* @returns Todos las katas o una en particular
*/

@Get('/')
  public async getKatas (@Query() limit: number, @Query() page: number, @Query() id?: string): Promise<any> {
    let response: any = ''

    if (id) {
      logSuccess(`[api/usesr]: Get kata by ID: ${id} `)
      response = await getKataById(id)
    } else {
      logSuccess('[api/usesr]: Get all katas ')
      response = await getAllKatas(limit, page)
    }

    return response
  }

/**
* Endpoint que borrara una kata de la BD
* @param {string} id Id para identificar la kata
* @returns Devolvera un mensaje si la Kata se borro correctamente
*/
@Delete('/')
public async deleteKataById (@Query() id?: string): Promise<any> {
  let response: any = ''

  if (id) {
    logSuccess(`[api/katas]: Delete Kata by ID: ${id}`)
    await deleteKataById(id).then(r => {
      response = {
        message: 'Kata deleted'
      }
    })
  } else {
    logWarning('[api/katas]:  Delete Kata Request WITHOUT ID ')
    response = {
      message: 'Please, provide an ID to remove kata for database'
    }
  }

  return response
}

@Post('/')
public async createKata (kata: IKata): Promise<any> {
  let response: any = ''

  if (kata) {
    logSuccess(`[api/katas] Register new Kata: ${kata.name}`)
    await createKata(kata).then(r => {
      logSuccess(`[api/katas] Create kata: ${kata.name}`)
      response = {
        message: `Kata created successfully: ${kata.name}`
      }
    })
  } else {
    logWarning('[api/katas] Register needs Kata Entity')
    response = {
      message: 'Please, provide a Kata Entity to create one'
    }
  }
  return response
}

  @Put('/')
public async updateKata (kata: IKata, @Query()id?: string) {
  let response: any = ''
  if (id) {
    logSuccess(`[api/katas]: Update Kata by ID: ${id}`)
    await updateKata(kata, id).then(r => {
      response = {
        message: `Kata with ID:${id} updated successfully `
      }
    })
  } else {
    logWarning('[api/katas]:  Update Kata Request WITHOUT ID ')
    response = {
      message: 'Please, provide an ID to update an existing kata'
    }
  }

  return response
}
}
