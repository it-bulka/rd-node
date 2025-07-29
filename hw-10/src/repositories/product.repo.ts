import { Orm } from '../orm/orm';
import { pool } from '../db/pool';

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export const productRepo = new Orm<Product>('products', pool);