import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCompanyComponent } from './orders-company.component';

describe('OrdersCompanyComponent', () => {
  let component: OrdersCompanyComponent;
  let fixture: ComponentFixture<OrdersCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
