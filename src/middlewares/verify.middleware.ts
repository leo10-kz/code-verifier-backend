import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secret = process.env.SECRETKEY || 'MYSECRETKEY'
/**
 *
 * @param req Original request previous middleware of verification JWT
 * @param res Response to verification of JWT
 * @param next Next function
 * @returns Errors of verification or Next execution
 */
export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  // check HEADER from Request for 'x-access-token'

  const token: any = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      athenticationError: 'Missing JWT in request',
      message: 'Not authorized to consume this endpoint'
    })
  }

  // check the token obtained

  jwt.verify(token, secret, (error: any, decoded: any) => {
    if (error) {
      return res.status(500).send({
        athenticationError: 'JWT verification failed',
        message: 'Failed to verify JWT token in request'
      })
    }
    // Exeecuted Next Function ---> Protected Routes will be executed
    next()
  })
}
