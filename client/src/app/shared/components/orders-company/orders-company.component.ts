import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

interface order {
  order_id: number;
  adress:string;
 phone: number;
  Date: Date,
 product_name: string;
 price: number
}
interface orderCompany extends order {
     user_id: number;
      user_name:string;
      product_name: string;
      company_id:number;
}

@Component({
  selector: 'app-orders-company',
  standalone: true,
  imports: [NgFor,NgIf],
  providers: [DatePipe],
  templateUrl: './orders-company.component.html',
  styleUrl: './orders-company.component.css'
})
export class OrdersCompanyComponent {

@Input() orders:[orderCompany]|undefined

constructor(private DatePipe:DatePipe ){}
formatDate(date: Date | undefined): string | null {
 return this.DatePipe.transform(date);  
}
}
