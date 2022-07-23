import { IUser } from '../../domain/interfaces/IUser.interface'
import { BasicResponse } from '../types'

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUsersController {
   getUsers(id?: string): Promise<any>;
   deleteUserById(id?: string): Promise<any>;
   updateUser(user: any, id?: string): Promise<any>;
}

export interface IAuthController {
   registerUser(user: IUser): Promise<any>;
   loginUser(auth: any): Promise<any>;
}
