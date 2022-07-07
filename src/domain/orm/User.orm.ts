import { userEntity } from '../entities/User.entity'
import { logError } from '../../utils/logger'

/**
 * Obtengo todos los usuarios de mi Coleccion Users the Mongo Server
 */
export const GetAllUsers = async (): Promise< any[] | undefined > => {
  try {
    const userModel = userEntity()

    return await userModel.find({ isDelete: false })
  } catch (error) {
    logError(`[ORM Error]: ${error}`)
  }
}
