import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { Product } from './product';

let products = [{
  name: 'Product 1',
  price: 1000
}, {
  name: 'Product 2',
  price: 100
}, {
  name: 'Product 3',
  price: 10
}];

@Injectable()
export class ProductInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Handle 'get_products' request
    if (req.url.includes('get_products')) {
      // Mock backend response with static data
      return next.handle(req).pipe(map(() => {
        return new HttpResponse({
          body: products.map(product => {
            return new Product(product.name, product.price);
          })
        });
      }));
    }

    // Handle 'add_product' request
    if (req.url.includes('add_product')) {
      return next.handle(req).pipe(map(() => {
        products.push({name: req.body.getName(), price: req.body.getPrice()});
        return new HttpResponse({
          body: products.map(product => {
            return new Product(product.name, product.price);
          })
        });
      }));
    }

    // Handle 'delete_product' request
    if (req.url.includes('delete_product')) {
      return next.handle(req).pipe(map(() => {
        products.splice(products.findIndex((product: any) => JSON.stringify(product) === JSON.stringify(req.body)), 1);
        return new HttpResponse({
          body: products.map(product => {
            return new Product(product.name, product.price);
          })
        });
      }));
    }

    // Handle 'edit_product' request
    if (req.url.includes('edit_product')) {
      return next.handle(req).pipe(map(() => {
        let index: number = products.findIndex((product: any) => JSON.stringify(product) === JSON.stringify(req.body.product));
        products[index] = req.body.changedProduct;
        return new HttpResponse({
          body: products.map(product => {
            return new Product(product.name, product.price);
          })
        });
      }));
    }

    return next.handle(req);
  }
}
