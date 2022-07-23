import { userEntity } from '../entities/User.entity'
import { logError } from '../../utils/logger'
import { IUser } from '../interfaces/IUser.interface'
import { IAuth } from '../interfaces/IAuth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secret = process.env.SECRETKEY || 'MYSECRETKEY'
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

    const user = await userModel.findById(id)
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age
    }
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

export const registerUser = async (user: IUser): Promise<any> => {
  try {
    const userModel = userEntity()

    return await userModel.create(user)
  } catch (error) {
    logError(`[ORM Error]: Creating User ${error}`)
  }
}

export const loginUser = async (auth: IAuth): Promise<any> => {
  try {
    const userModel = userEntity()
    let userFound: IUser | undefined

    await userModel.findOne({ email: auth.email }).then((user: IUser) => {
      userFound! = user
    }).catch(error => {
      console.error('[ERROR Authentication in ORM] User not found')
      throw new Error(`[ERROR Authentication in ORM] User not found: ${error}`)
    })

    const validPassword = bcrypt.compareSync(auth.password, userFound!.password)
    if (!validPassword) {
      console.error('[ERROR Authentication in ORM] Password not valid')
      throw new Error('[ERROR Authentication in ORM] Password not valid')
    }

    const token = jwt.sign({ email: userFound!.email }, secret, {
      expiresIn: '2h'
    })

    console.log('DATA', token)
    return {
      token,
      user: userFound
    }
  } catch (error) {
    logError(`[ORM Error]: Logged User ${error}`)
  }
}
