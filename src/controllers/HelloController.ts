import { Get, Query, Route, Tags } from 'tsoa'
import { BasicResponse } from './types'
import { IHelloController } from './interfaces'
import { logSuccess } from '../utils/logger'

@Route('/api/hello')
@Tags('HelloController')
export class HelloController implements IHelloController {
  /**
   * Endpoint que responde con un "Hello name"
   * @param { string | undefined } name Name que se recibe por params
   * @returns { BasicResponse } Retorna una Promesa
   */
  @Get('/')
  public async getMessage (@Query()name?: string): Promise<BasicResponse> {
    logSuccess('[/api/hello] GET request')

    return {
      message: `Hello ${name || 'anonimus'}`
    }
  }
}
