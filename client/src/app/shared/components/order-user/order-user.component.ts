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
@Component({
  selector: 'app-order-user',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [DatePipe],
  templateUrl: './order-user.component.html',
  styleUrl: './order-user.component.css',
})
export class OrderUserComponent {
  @Input() orders: [order] | undefined;
  
 constructor(private DatePipe:DatePipe ){}
 formatDate(date: Date | undefined): string | null {
  return this.DatePipe.transform(date);  
}
}
