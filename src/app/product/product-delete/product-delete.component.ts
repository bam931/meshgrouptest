import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { Subject } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';


interface DialogData {
  product: Product;
}

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  delete(): void {
    this.productService.delete(this.data.product).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dialogRef.close();
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
