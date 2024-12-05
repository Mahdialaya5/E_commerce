import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';


interface order{
company_id:number
id:number;
product:string;
user_id:number
user_name: string;
}

@Component({
  selector: 'app-orders-company',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './orders-company.component.html',
  styleUrl: './orders-company.component.css'
})
export class OrdersCompanyComponent {

@Input() orders:[order]|undefined


}
