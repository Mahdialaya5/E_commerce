import { Pipe, PipeTransform } from '@angular/core';

interface order {
  order_id: number;
  adress:string;
 phone: number;
  Date: Date,
 product_name: string;
 price: number
}
@Pipe({
  name: 'totalPrice',
  standalone: true
})

export class TotalPricePipe implements PipeTransform {
  total:number=0
  transform(value:[order]|undefined): void{
    value?.map((el)=>this.total+=el.price);
console.log(this.total);
  }

}
