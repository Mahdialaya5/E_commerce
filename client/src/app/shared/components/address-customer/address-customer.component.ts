import { NgFor, NgIf } from '@angular/common';
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
  selector: 'app-address-customer',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './address-customer.component.html',
  styleUrl: './address-customer.component.css'
})
export class AddressCustomerComponent {

@Input() addressCustomer: [orderCompany] | undefined
}
