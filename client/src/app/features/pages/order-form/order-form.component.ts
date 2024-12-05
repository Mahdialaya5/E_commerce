import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { OrdersService } from '../../../core/services/order/orders.service';
import { Router } from '@angular/router';

interface product {
  id: string;
  product_name: string;
  description: string;
  company_id: number;
  user_name: string;
  price: number;
  photo: string;
  add_at: string;
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
})
export class OrderFormComponent {
  orderForm: FormGroup;
  id: string | null = null;
  product: product | undefined;
  succes: string = '';
  constructor(
    private fr: FormBuilder,
    private route: ActivatedRoute,
    private productsServices: ProductService,
    private orderServices: OrdersService,
    private router: Router
  ) {
    this.orderForm = this.fr.group({
      address: ['', [Validators.required]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.productsServices.getOneProducts(this.id).subscribe({
      next: (res: product) => {
        this.product = res;
      },
      error: (err: any) => {
        throw err;
      },
    });
  }

  onSubmit() {
    this.orderServices
      .sendOrder({ ...this.orderForm.value, product_id: this.product?.id })
      .subscribe({
        next: (res: any) => {
          this.succes = res.msg;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err: any) => {
          throw err;
        },
      });
  }
}
