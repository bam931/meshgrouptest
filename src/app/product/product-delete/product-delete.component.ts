import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../product';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from '../product.service';


interface DialogData {
  product: Product;
}

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  delete(): void {
    this.productService.delete(this.data.product).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
