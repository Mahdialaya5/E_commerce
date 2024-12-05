import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [NgIf],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  @Input() productsNumber:number=0
  @Input() user:any
  @Input() ordernumber:number=0
  @Input() Total:number=0
 
  
 }
