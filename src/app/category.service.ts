import { Injectable } from '@angular/core';
import axios from 'axios';
import { Category } from './models/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  getAll(): Promise<any> {
    return axios.get('/api/Category')
  }

  delete(id: string): Promise<any> {
    return axios.delete('/api/Category/' + id)
  }

  create(data: any): Promise<any> {
    let payload = {
      name: data.name,
      description: data.description
    }

    return axios.post('/api/Category', payload)
  }

  show(id: string): Promise<any> {
    return axios.get('/api/Category/' + id)
  }

  update(data: Category): Promise<any> {
    let payload = {
      name: data.name,
      description: data.description
    }

    return axios.put('/api/Category/' + data.id, payload)
  }

}
