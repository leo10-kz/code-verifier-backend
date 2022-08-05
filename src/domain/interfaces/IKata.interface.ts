export enum KataLevel {
    // eslint-disable-next-line no-unused-vars
    BASIC = 'Basic',
    // eslint-disable-next-line no-unused-vars
    MEDIUM = 'Medium',
    // eslint-disable-next-line no-unused-vars
    HIGH = 'High'
}

export interface IKata {
   name: string,
   description: string,
   level: KataLevel,
   intents: number,
   stars: number,
   creator: string, // Id of User
   solution: string,
   participants: string[]
}
