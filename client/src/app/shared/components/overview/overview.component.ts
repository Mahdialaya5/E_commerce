import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';


interface mostSeller {
  product_name: string;
      total_order: number;
}
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  @Input() productsNumber:number=0
  @Input() user:any
  @Input() ordernumber:number=0
  @Input() Total:number=0
  @Input() ordersCompanyNumber:number=0
  @Input() TotalCustomer:number=0
  @Input() ordersnumberadmin:number=0
  @Input() mostSeller:[mostSeller]|undefined
 }
