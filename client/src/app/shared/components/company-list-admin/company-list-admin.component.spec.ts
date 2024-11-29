import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListAdminComponent } from './company-list-admin.component';

describe('CompanyListAdminComponent', () => {
  let component: CompanyListAdminComponent;
  let fixture: ComponentFixture<CompanyListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyListAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
