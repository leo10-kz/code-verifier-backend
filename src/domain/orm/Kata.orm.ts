import { kataEntity } from '../entities/Kata.entity'
import { logError } from '../../utils/logger'
import { IKata } from '../interfaces/IKata.interface'

/**
 * Obtengo todos las katas de mi Coleccion Katas the Mongo Server
 */
export const getAllKatas = async (limit: number, page: number): Promise< any[] | undefined > => {
  try {
    const kataModel = kataEntity()
    const response: any = {}

    // Serch all Users (Using pagination)
    await kataModel.find({ isDelete: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec().then((katas: IKata[]) => {
        response.katas = katas
      })

    // Count total documents in collection Users
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit)
      response.currentPage = page
    })
    return response
  } catch (error) {
    logError(`[ORM Error]: Getting all katas: ${error}`)
  }
}

/**
 *  Obtengo un usuario especifico por id que  me pasan por parametro
 */
export const getKataById = async (id: string): Promise<any> => {
  try {
    const kataModel = kataEntity()

    return await kataModel.findById(id)
  } catch (error) {
    logError(`[ORM Error]: Geting kata by ID: ${error}`)
  }
}

export const deleteKataById = async (id: string): Promise<any> => {
  try {
    const kataModel = kataEntity()

    return await kataModel.deleteOne({ _id: id })
  } catch (error) {
    logError(`[ORM Error]: Deleting kata by ID: ${error}`)
  }
}

export const createKata = async (kata: IKata): Promise<any> => {
  try {
    const kataModel = kataEntity()

    return await kataModel.create(kata)
  } catch (error) {
    logError(`[ORM Error]: Creating kata ${error}`)
  }
}

export const updateKata = async (kata: IKata, id: string): Promise<any> => {
  try {
    const kataModel = kataEntity()

    return await kataModel.findByIdAndUpdate(id, kata)
  } catch (error) {
    logError(`[ORM Error]: Updating Kata ${error}`)
  }
}
