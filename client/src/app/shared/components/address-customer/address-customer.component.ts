import { Component, Input } from '@angular/core';


interface address{
  adress:string;
  phone: number;
  user_name: string;
   id: number;
   order_id:number;
  } 

@Component({
  selector: 'app-address-customer',
  standalone: true,
  imports: [],
  templateUrl: './address-customer.component.html',
  styleUrl: './address-customer.component.css'
})
export class AddressCustomerComponent {

@Input() addressCustomer: [address] | undefined
}
