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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    OverviewComponent,
    AddProductComponent,
    ListProductsComponent,
    SettingsComponent,
    NgIf,
    RouterLink,
  ],
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

  newPhoto = new FormGroup({
    file: new FormControl(),
  });
  path: string | null =
    typeof window !== 'undefined' ? window.location.pathname : null;

  constructor(
    private AuthService: AuthService,
    private userServices: UserService,
    private productsServices: ProductService
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

            if (this.user?.id) {
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
