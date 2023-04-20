import express from 'express'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler'
import requestsRoutes from './routes/requests.route'
import { config } from 'dotenv'
import * as path from 'node:path'

config()

const app = express()
const PORT = 80
const prodClientFolder = path.resolve('.', 'client', 'dist')
const isProd = process.env.NODE_ENV == 'production'

app.use(cors())
app.use(express.json())
app.use(requestsRoutes)

if (isProd) {
  app.use(express.static(prodClientFolder))
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
