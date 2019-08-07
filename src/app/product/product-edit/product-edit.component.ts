import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from '../product';

interface DialogData {
  product: Product;
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;

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
    console.log(this.data.product);
    console.log(newProduct);
    this.productService.edit(this.data.product, newProduct).subscribe(() => this.dialogRef.close());
  }
}
