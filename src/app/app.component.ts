import { Component, OnInit } from '@angular/core';
import { Product } from './product/product';
import { ProductService } from './product/product.service';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { MatDialog } from '@angular/material';
import { ProductEditComponent } from './product/product-edit/product-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productService.get().subscribe((products: Product[]) => {
      console.log(products);
      this.products = products;
    });
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
