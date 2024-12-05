import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';


interface product {
  id:string;
  product_name:string;
  description:string;
  company_id:number;
  user_name:string;
  price:number;
  photo:string;
  add_at:string
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  id: string | null = null;
  product : product |undefined
  role:string=""

   constructor(private route: ActivatedRoute,
        private Auth:AuthService,
      private productsServices:ProductService) {}
 
   ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    
    this.Auth.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
    this.Auth.getCurrentUser().subscribe({
      next: (res: any) => {
        this.role = res.role;
       
      },
      error: (error: any) => {
        throw error;
      },
    });
  }})
   this.productsServices.getOneProducts(this.id).subscribe({
    next: (res:product) => {
      this.product=res },
    error: (err: any) => {
     throw err
    },
  });

  }

}
