import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import products from "../assets/product.json";


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = "https://localhost:7047/";

  constructor(private httpClient: HttpClient) {}

  addProduct(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'products', data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + `products/${id}`, data);
  }

  getProductList(): Observable<any> {
    //return products;
    return this.httpClient.get(this.baseUrl + 'api/Product');
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `products/${id}`);
  }
}
