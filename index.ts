import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

// Configuration the .env file
dotenv.config()

// Create Express App
const app:Express = express()
const port = process.env.PORT || 8000

// The first route
app.get('/', (req:Request, res:Response) => {
  res.send('Comensando nuevo cuerso de Full Stack')
})

app.get('/hello', (req:Request, res:Response) => {
  res.send('Hello my friends')
})

// Execute App and listen Request to  port
app.listen(port, () => {
  console.log(`Express Server: Running at http://localhost:${port}`)
})
