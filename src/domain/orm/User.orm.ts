import { userEntity } from '../entities/User.entity'
import { logError } from '../../utils/logger'

/**
 * Obtengo todos los usuarios de mi Coleccion Users the Mongo Server
 */
export const getAllUsers = async (): Promise< any[] | undefined > => {
  try {
    const userModel = userEntity()

    return await userModel.find({ isDelete: false })
  } catch (error) {
    logError(`[ORM Error]: ${error}`)
  }
}

/**
 *  Obtengo un usuario especifico por id que  me pasan por parametro
 */
export const getUserById = async (id: string): Promise<any> => {
  try {
    const userModel = userEntity()

    return await userModel.findById(id)
  } catch (error) {
    logError(`[ORM Error]: ${error}`)
  }
}

export const deleteUserById = async (id: string): Promise<any> => {
  try {
    const userModel = userEntity()

    return await userModel.deleteOne({ _id: id })
  } catch (error) {
    logError(`[ORM Error]: ${error}`)
  }
}

export const createUser = async (user: any): Promise<any> => {
  try {
    const userModel = userEntity()

    return await userModel.create(user)
  } catch (error) {
    logError(`[ORM Error]: Creating User ${error}`)
  }
}

export const updateUser = async (user: any, id: string): Promise<any> => {
  try {
    const userModel = userEntity()

    return await userModel.findByIdAndUpdate(id, user)
  } catch (error) {
    logError(`[ORM Error]: Updating User ${error}`)
  }
}
