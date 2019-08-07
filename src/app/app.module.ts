import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductInterceptor } from './product/product.interceptor';
import { ProductService } from './product/product.service';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    ProductDeleteComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: ProductInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ProductAddComponent, ProductDeleteComponent, ProductEditComponent ]
})
export class AppModule { }
