import { BasicResponse } from './types'
import { IHelloController } from './interfaces'
import { logSuccess } from '../utils/logger'

export class HelloController implements IHelloController {
  public async getMessage (name?: string): Promise<BasicResponse> {
    logSuccess('[/api/hello] GET request')

    return {
      message: `Hello ${name || 'anonimus'}`
    }
  }
}
