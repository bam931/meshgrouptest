import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductAddComponent>,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const newProduct: Product = new Product(this.form.get('name').value, this.form.get('price').value);
    this.productService.add(newProduct).subscribe(() => this.dialogRef.close());
  }
}
