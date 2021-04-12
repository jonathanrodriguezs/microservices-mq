import { Request, Response } from 'express'
import { Repository } from 'typeorm'
import { Product } from '../entities/product'
import HttpCode from '../utils/HttpStatusCode'

export class ProductController {
  constructor(private model: Repository<Product>) {}

  async list(req: Request, res: Response) {
    try {
      const products = await this.model.find()
      return res.json(products)
    } catch (error) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const product = await this.model.create(req.body)
      const result = await this.model.save(product)
      return res.json(result)
    } catch (error) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  async show(req: Request, res: Response) {
    try {
      const product = await this.model.findOne(req.params.id)
      return res.json(product)
    } catch (error) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = await this.model.findOne(req.params.id)
      this.model.merge(product, req.body)
      const result = await this.model.save(product)
      return res.json(result)
    } catch (error) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await this.model.delete(req.params.id)
      return res.json(result)
    } catch (error) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  async incrementLikes(req: Request, res: Response) {
    try {
      const product = await this.model.findOne(req.params.id)
      const data = { ...product, likes: product.likes + 1 }
      const result = await this.model.save(data)
      return res.json(result)
    } catch (error) {
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}
