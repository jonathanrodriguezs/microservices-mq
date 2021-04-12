import * as express from 'express'
import * as cors from 'cors'
import { createConnection } from 'typeorm'
import productRoutes from './routes/product'

createConnection().then(db => {
  const app = express()
  const port = process.env.PORT || 8000

  app.use(cors({ origin: ['http://localhost:3000'] }))

  app.use(express.json())

  app.use('/api/products', productRoutes)

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
})
