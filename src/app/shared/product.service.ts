import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../shared/product';

@Injectable()
export class ProductService {

  private _products = "/api/products";


  constructor(private http: HttpClient) { }

  getAllProducts() {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'token': `bearer ${token}` });
    return this.http.get(this._products, { headers });

  }

  // addProduct(product) {

  //   let token = 'Bearer' + localStorage.getItem('token');

  //   let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'token': `bearer ${token}` });
  //   return this.http.post(this._products, product, { headers });

  // }

}
