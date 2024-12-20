import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { OverviewComponent } from '../../../shared/components/overview/overview.component';
import { NgIf } from '@angular/common';
import { SettingsComponent } from '../../../shared/components/settings/settings.component';
import { AuthService } from '../../../core/auth/auth.service';
import { RouterLink } from '@angular/router';
import { ListProductsComponent } from '../../../shared/components/products-list/list-products.component';
import { ProductService } from '../../../core/services/product/product.service';
import { AddProductComponent } from '../../../shared/components/add-product/add-product.component';
import { UserService } from '../../../core/services/user/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserListAdminComponent } from '../../../shared/components/user-list-admin/user-list-admin.component';
import { CompanyListAdminComponent } from '../../../shared/components/company-list-admin/company-list-admin.component';
import { OrdersService } from '../../../core/services/order/orders.service';
import { OrdersCompanyComponent } from '../../../shared/components/orders-company/orders-company.component';
import { AddressCustomerComponent } from '../../../shared/components/address-customer/address-customer.component';
import { OrderUserComponent } from '../../../shared/components/order-user/order-user.component';
import { TotalPricePipe } from '../../../shared/pipes/user/total-price.pipe';
import { TotalPipe } from '../../../shared/pipes/company/TotalOrders/total.pipe';
import { CustomerPipe } from '../../../shared/pipes/company/customer/customer.pipe';

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
interface mostSeller {
  product_name: string;
      total_order: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    OverviewComponent,
    AddProductComponent,
    ListProductsComponent,
    SettingsComponent,
    UserListAdminComponent,
    CompanyListAdminComponent,
    OrdersCompanyComponent,
    AddressCustomerComponent,
    OrderUserComponent,
    NgIf,
    RouterLink,
  ],
  providers: [TotalPricePipe, TotalPipe, CustomerPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  toggle: string = 'Overview';
  user: any = '';
  isLogged: boolean | undefined;
  add: boolean = false;
  productsNumber: number = 0;
  editphoto: boolean = false;
  orders: [order] | undefined;
  ordersCompany: [orderCompany] | undefined;
  mostSeller:[mostSeller]|undefined
  orderNumber:number=0
  Total: number = 0;
  TotalCustomer: number = 0;
  newPhoto = new FormGroup({ file: new FormControl() });
  path: string | null =
    typeof window !== 'undefined' ? window.location.pathname : null;

  constructor(
    private AuthService: AuthService,
    private userServices: UserService,
    private productsServices: ProductService,
    private Orderservices: OrdersService,
    private pipe: TotalPricePipe,
    private pipeCompany: TotalPipe,
    private CustomerPipe: CustomerPipe
  ) {}

  toggledashboard(event: string): void {
    this.toggle = event;
  }

  return(event: boolean): void {
    this.add = event;
  }

  toggleEdit(): void {
    this.editphoto = !this.editphoto;
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files?.[0]) {
      const file = fileInput.files?.[0];
      this.newPhoto.patchValue({ file });
      this.newPhoto.get('file')?.updateValueAndValidity();
    }
  }

  Edit(): void {
    this.toggleEdit();

    const formData = new FormData();
    const file = this.newPhoto.get('file')?.value;
    if (file) {
      formData.append('file', file);
      this.userServices.updateUserPhoto(formData).subscribe({
        next: () => {
          this.AuthService.getCurrentUser().subscribe({
            next: (res: any) => {
              this.user = res;
              console.log(this.user);
            },
            error: (error: any) => {
              throw error;
            },
          });
        },
        error: (err: any) => {
          throw err;
        },
      });
    }
  }

  ngOnInit() {
    this.AuthService.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.AuthService.getCurrentUser().subscribe({
          next: (res: any) => {
            this.user = res;
            switch (true) {
              case this.user?.id && this.user.role === 'company':
                this.productsServices
                  .getNumberProductsbyCompany(this.user.id)
                  .subscribe({
                    next: (res: any) => {
                      this.productsNumber = res.msg;
                    },
                    error: (error: any) => {
                      throw error;
                    },
                  });
                this.Orderservices.getOrdersCompany().subscribe({
                  next: (res: any) => {
                    this.ordersCompany = res.orders;
                    this.pipeCompany.transform(this.ordersCompany);
                    this.CustomerPipe.transform(this.ordersCompany);
                    this.TotalCustomer = this.CustomerPipe.totalCusotmer;
                    this.Total = this.pipeCompany.total;
                  },
                  error: (error: any) => {
                    throw error;
                  },
                });
                break;

              case this.user?.id && this.user.role === 'admin':
                this.productsServices.getNumberAllProducts().subscribe({
                  next: (res: any) => {
                    this.productsNumber = res.msg;
                  },
                  error: (error: any) => {
                    throw error;
                  },
                });
                this.Orderservices.getOrdersAdmin().subscribe({
                  next:(res:any)=>{
                    this.orderNumber=res.msg
                  },
                  error: (error: any) => {
                    throw error;
                  }
                })
                this.Orderservices.getSumOrdersAdmin().subscribe({
                  next:(res:any)=>{
                    this.Total=res.msg
                  },
                  error: (error: any) => {
                    throw error;
                  }
                })
                this.Orderservices.getMostProductSeller().subscribe({
                  next:(res:any)=>{
                    this.mostSeller=res.msg
                  },
                  error: (error: any) => {
                    throw error;
                  }
                })
                break;
              default:
                this.Orderservices.getOrdersUser().subscribe({
                  next: (res: [order] | undefined) => {
                    this.orders = res;
                    this.pipe.transform(this.orders);
                    this.Total = this.pipe.total;
                  },
                  error: (error: any) => {
                    throw error;
                  },
                });
                break;
            }
          },
          error: (error: any) => {
            throw error;
          },
        });
      } else {
        this.isLogged = false;
      }
    });
  }
}
