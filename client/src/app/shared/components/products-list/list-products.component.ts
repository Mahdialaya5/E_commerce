import { Component, Input } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { NgIf } from '@angular/common';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { RouterLink } from '@angular/router';

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
  selector: 'app-list-products',
  standalone: true,
  imports: [NgIf,EditProductComponent,RouterLink],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export class ListProductsComponent {
  
  @Input() productList: [product] | undefined;
  @Input() user_id: string | null = '';
  @Input() pathname: string | null = '';
    oneProduct:product | undefined 
     edit:boolean=false

  constructor(private PorductService: ProductService) {}

  ngOnInit() {

   if (this.user_id) {
    this.PorductService.getProductsbyCompany(this.user_id).subscribe({
      next: (res: any) => {
        this.productList = res;
      },
      error: (err: any) => {
       throw err
      },
    });
   }
   
  }

  return(event:boolean):void{this.edit=event } 

 editProduct(value:product):void{
  this.oneProduct=value
  this.edit=true
 }

  delete(id: string) {
    const conf = confirm('are you sure ?');
    if (conf) {
      this.PorductService.deleteProduct(id).subscribe({
        next: () => {
          window?.location.reload();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
