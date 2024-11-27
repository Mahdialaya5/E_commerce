import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product/product.service';


interface product {
  id: string;
  product_name: string;
  description:string;
  company_id: number;
  user_name: string;
  price: number;
  photo: string;
  add_at: string;
}

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgIf],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
 
  @Input() oneProduct: product| undefined
  @Output() return = new EventEmitter<boolean>();
  productForm: FormGroup;
  error: string = '';

  constructor(
    private fr: FormBuilder,
    private productservices: ProductService
  ) {
    this.productForm = this.fr.group({
      price: [this.oneProduct?.price],
      name: [this.oneProduct?.product_name],
      description:[""],
      file: [null],
    });
  }
  
  cancel(value: boolean) {
   this.return.emit(value);
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const file = fileInput.files[0];
      this.productForm.patchValue({file});
    }
  }
 
  submitForm() {
 
    if (this.productForm.invalid) {
      alert(this.productForm.errors);
    } else {
      var formData = new FormData();
      for (const key in this.productForm.value) {
        if (this.productForm.value[key] !== null) {
          formData.append(key, this.productForm.value[key]);
        }
      }
      this.productservices.updateProduct(formData,this.oneProduct?.id).subscribe({
        next: () => {
          window?.location.reload();
          this.productForm.reset();
        },
        error: (err: any) => {
          this.error = 'Edit failed';
        },
      });
    }
  }
}
