import { Component, OnInit } from '@angular/core';
import { Product } from './product/product';
import { ProductService } from './product/product.service';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { MatDialog } from '@angular/material';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.products = this.productService.get();
  }

  openAddDialog(): void {
    this.dialog.open(ProductAddComponent);
  }

  openDeleteDialog(product: Product): void {
    this.dialog.open(ProductDeleteComponent, {
      data: { product: product }
    });
  }

  openEditDialog(product: Product): void {
    this.dialog.open(ProductEditComponent, {
      data: { product: product }
    });
  }
}
