import { Pipe, PipeTransform } from '@angular/core';

interface order {
  order_id: number;
  adress: string;
  phone: number;
  Date: Date;
  product_name: string;
  price: number;
}
interface orderCompany extends order {
  user_id: number;
  user_name: string;
  product_name: string;
  company_id: number;
}
@Pipe({
  name: 'total',
  standalone: true,
})
export class TotalPipe implements PipeTransform {
  total: number = 0;
  transform(value: [orderCompany] | undefined): void {
    value?.map((el) => (this.total += el.price));
  }
}
