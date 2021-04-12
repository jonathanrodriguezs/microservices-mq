import { Product } from './src/entities/product'

export default {
  type: 'mysql',
  host: 'product-service-db',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'db',
  entities: [Product],
  logging: true,
  synchronize: true
}
