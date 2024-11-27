import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../core/services/product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {

  @Input() add: boolean = false;
  @Input() user_id: string | null = '';
  @Output() return = new EventEmitter<boolean>();
  productForm: FormGroup;
  error: string = '';

  constructor(
    private fr: FormBuilder,
    private productservices: ProductService
  ) {
    this.productForm = this.fr.group({
      price: ['', Validators.required],
      name: ['', Validators.required],
      description:['', Validators.required],
      file: [null, Validators.required],
    });
  }
  cancel(value: boolean) {
    this.return.emit(value);
  }
  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const file = fileInput.files[0];
      this.productForm.patchValue({ file });
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
      this.productservices.addProduct(formData).subscribe({
        next: () => {
          window?.location.reload();
          this.productForm.reset();
        },
        error: (err: any) => {
          this.error = 'Add failed';
        },
      });
    }
  }
}
