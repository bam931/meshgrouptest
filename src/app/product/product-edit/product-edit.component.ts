import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from '../product';
import { Subject, Subscription } from 'rxjs/index';
import { takeUntil } from 'rxjs/internal/operators';

interface DialogData {
  product: Product;
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.product.getName(), Validators.required],
      price: [this.data.product.getPrice(), [Validators.required, Validators.min(1)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const newProduct: Product = new Product(this.form.get('name').value, this.form.get('price').value);
    this.productService.edit(this.data.product, newProduct).pipe(takeUntil(this.destroy$)).subscribe(() => this.dialogRef.close());
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
