import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { error } from 'console';
import { NgIf } from '@angular/common';


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
 
   constructor(private route: ActivatedRoute,private productsServices:ProductService) {}
 
   ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
   
    })
   this.productsServices.getOneProducts(this.id).subscribe({
    next: (res:product) => {
      this.product=res
     
    },
    error: (err: any) => {
     throw err
    },
  });

  }

}
