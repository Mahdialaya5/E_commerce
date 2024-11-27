import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ListProductsComponent } from '../../../shared/components/products-list/list-products.component';
import { ProductService } from '../../../core/services/product/product.service';
import { FormsModule} from '@angular/forms';



interface product {
  id:string;
  product_name:string;
  company_id:number;
  description:string;
  user_name:string;
  price:number;
  photo:string;
  add_at:string
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent,ListProductsComponent,FooterComponent,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  
  productList:[product] | undefined 
  data:[product] | undefined 
  search:any=[{
    id:'',
    product_name:'',
    description:"",
    company_id:1,
    user_name:'',
    price:11,
    photo:'',
    add_at:''
  }]

  inputValue: string = '';

  constructor( private PorductService: ProductService ) {}

  ngOnInit(){
    this.PorductService.getProducts().subscribe(
      {next: (res:[product]) => {
      this.data=res;
      this.productList=res
    },
    error: (err: any) => {
     throw err
  }})

  }

 searchChange(){
  
    this.search= this.data?.filter((el)=>el.product_name.toLocaleLowerCase().includes(this.inputValue.toLocaleLowerCase())) 
    this.productList=this.search
}

}
