import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import fs from 'fs'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import db from './config/db'
import { notFound, errorHandler } from './middleware/errorHandler'

//imports routes here
import userRoutes from './routes/userRoute'

let app = express()
dotenv.config()

app.use(morgan('dev', { stream: fs.createWriteStream('./app.log') }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const PORT = process.env.PORT

app.use('/health', (req, res) => {
    res.send("<h1>Health OK</h1>")
})

app.use('/api/user', userRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, (err) => {
    console.log(`Server is running on ${PORT}`)
})