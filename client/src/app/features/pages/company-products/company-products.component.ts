import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ListProductsComponent } from '../../../shared/components/products-list/list-products.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';


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
  selector: 'app-company-products',
  standalone: true,
  imports: [NavbarComponent,ListProductsComponent,FooterComponent],
  templateUrl: './company-products.component.html',
  styleUrl: './company-products.component.css'
})
export class CompanyProductsComponent {

 id: string | null = null;
 products : [product] | undefined

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
   
    })
  }

}
