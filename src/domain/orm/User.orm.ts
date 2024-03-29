import { userEntity } from '../entities/User.entity'
import { kataEntity } from '../entities/Kata.entity'
import { logError } from '../../utils/logger'
import { IUser } from '../interfaces/IUser.interface'
import { IAuth } from '../interfaces/IAuth.interface'
/* import { UserResponse } from '../types/UserResponse.type' */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secret = process.env.SECRETKEY || 'MYSECRETKEY'
/**
 * Obtengo todos los usuarios de mi Coleccion Users the Mongo Server
 */
export const getAllUsers = async (limit: number, page: number): Promise< any[] | undefined > => {
  try {
    const userModel = userEntity()
    const response: any = {}

    // Serch all Users (Using pagination)
    await userModel.find({ isDelete: false })
      .select('name email age katas')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec().then((users: IUser[]) => {
        response.users = users
      })

    // Count total documents in collection Users
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit)
      response.currentPage = page
    })
    return response
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
      age: user.age,
      katas: user.katas
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

export const getKatasFromUser = async (limit: number, page: number, id: string) => {
  const userModel = userEntity()
  const kataModel = kataEntity()

  try {
    let response = {}

    const user: IUser | null = await userModel.findById(id)

    const katasFound = await kataModel.find({ _id: { $in: user!.katas } })

    if (katasFound) {
      response = {
        name: user!.name,
        katas: katasFound
      }
    } else {
      response = {
        name: user!.name,
        message: 'The user has no kata'
      }
    }

    return response
  } catch (error) {
    logError(`[ORM Error]: Katas from user ${error}`)
  }
}
