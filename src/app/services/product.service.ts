import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}
  private readonly DATA_PATH = 'assets/data';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.DATA_PATH}/products.json`);
  }
}
