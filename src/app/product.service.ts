import { Injectable } from '@angular/core';
import axios from 'axios';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  getAll(): Promise<any> {
    return axios.get('/api/Product')
  }

  delete(id: string): Promise<any> {
    return axios.delete('/api/Product/' + id)
  }

  create(data: any): Promise<any> {
    let payload = {
      name: data.name,
      description: data.description,
      price: data.price,
      color: data.color,
      categoryId: data.categoryId
    }

    return axios.post('/api/Product', payload)
  }

  show(id: string): Promise<any> {
    return axios.get('/api/Product/' + id)
  }

  update(id: number, data: any): Promise<any> {
    let payload = {
      name: data.name,
      description: data.description,
      price: data.price,
      color: data.color,
      categoryId: data.categoryId

    }

    return axios.put('/api/Product/' + id, payload)
  }

}
