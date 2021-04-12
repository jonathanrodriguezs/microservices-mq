import { Router } from 'express'
import { Connection } from 'typeorm'
import { Product } from '../entities/product'
import { ProductController } from '../controllers/product'

const router = Router()

export default function (db: Connection) {
  const productRepository = db.getRepository(Product)
  const controller = new ProductController(productRepository)

  router.get('/api/products', controller.list)
  router.post('/api/products', controller.create)
  router.get('/api/products/:id', controller.show)
  router.put('/api/products/:id', controller.update)
  router.delete('/api/products/:id', controller.delete)
  router.post('/api/products/:id/like', controller.incrementLikes)

  return router
}
