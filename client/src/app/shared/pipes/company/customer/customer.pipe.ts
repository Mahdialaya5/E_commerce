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
  name: 'customer',
  standalone: true,
})
export class CustomerPipe implements PipeTransform {
  customerList: [string]=['']
  totalCusotmer: number = 0;
  transform(value: [orderCompany] |undefined): void {
    if (value && value[0].order_id==undefined) {
      this.totalCusotmer=0
      return
    }
    
    value?.map((el) => this.customerList.push(el.user_name));
    const uniqueCustomers = new Set(this.customerList);
    this.totalCusotmer = uniqueCustomers.size;
   
  }
}
