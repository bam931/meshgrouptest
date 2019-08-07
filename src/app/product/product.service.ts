import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, ReplaySubject } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { publishReplay, refCount } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  _products: ReplaySubject<Array<any>> = new ReplaySubject(1);
  products: Product[];

  constructor(private http: HttpClient) { }

  get(): Observable<Product[]> {
    if (!this.products) {
      this.products = [];
      this.http.get<Product[]>('api_url/get_products').pipe(publishReplay(1), refCount()).subscribe((products: Product[]) => {
        this.next(products);
      });
    }

    return this._products.asObservable();
  }

  add(product: Product): Observable<Product[]> {
    return this.http.post('api_url/add_product', product).pipe(map((products: Product[]) => {
      this.next(products);
      return products;
    }));
  }

  edit(product: Product, changedProduct: Product) {
    // Actually, here should be product ID as parameter instead of old product object and new
    return this.http.put('api_url/edit_product', { product: product, changedProduct: changedProduct }).pipe(map((products: Product[]) => {
      this.next(products);
      return products;
    }));
  }

  delete(product: Product) {
    return this.http.request('delete','api_url/delete_product', {body: product}).pipe(map((products: Product[]) => {
      this.next(products);
      return products;
    }));
  }

  next(products: Product[]) {
    this.products = products;
    this._products.next(products);
  }
}
