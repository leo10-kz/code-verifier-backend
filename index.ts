import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

// Configuration the .env file
dotenv.config()

// Create Express App
const app:Express = express()
const port = process.env.PORT || 8000

// The first route
app.get('/', (req:Request, res:Response) => {
  res.status(200).json({ data: { message: 'Goodbye world' } })
})

app.get('/hello', (req:Request, res:Response) => {
  const { name } = req.query

  if (name) {
    return res.status(200).json({ data: { message: `Hola, ${name}` } })
  }
  return res.status(200).json({ data: { message: 'Hola, anonimo' } })
})

// Execute App and listen Request to  port
app.listen(port, () => {
  console.log(`Express Server: Running at http://localhost:${port}`)
})
