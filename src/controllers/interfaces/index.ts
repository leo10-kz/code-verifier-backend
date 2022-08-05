import { IKata } from '../../domain/interfaces/IKata.interface'
import { IUser } from '../../domain/interfaces/IUser.interface'
import { BasicResponse } from '../types'

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUsersController {
   getUsers(limit: number, page: number, id?: string): Promise<any>;
   deleteUserById(id?: string): Promise<any>;
   updateUser(user: any, id?: string): Promise<any>;
   getKatas(limit: number, page: number, id?: string): Promise<any>;
}

export interface IAuthController {
   registerUser(user: IUser): Promise<any>;
   loginUser(auth: any): Promise<any>;
}

export interface IKataController {
   getKatas(limit: number, page: number, id?: string): Promise<any>;
   deleteKataById(id?: string): Promise<any>;
   createKata(kata: IKata): Promise<any>
   updateKata(Kata: IKata, id?: string): Promise<any>;
}
