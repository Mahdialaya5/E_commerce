import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { RegisterComponent } from './features/pages/register/register.component';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { CompanyProductsComponent } from './features/pages/company-products/company-products.component';
import { ProductDetailsComponent } from './features/pages/product-details/product-details.component';
import { AuthGuard } from './core/auth/auth.guard';
import { OrderFormComponent } from './features/pages/order-form/order-form.component';
import { AuthGuardUser } from './core/auth/user/auth.guard';
import { AboutComponent } from './features/pages/about/about.component';

export const routes: Routes = [
  
    {  path: '', component: HomeComponent ,title:"Home"},
    {  path: 'register', component: RegisterComponent ,title:"Register"},
    {  path: 'products', component: ProductsComponent ,title:"Products"},
    {  path: 'about', component:  AboutComponent ,title:"About"},
    {  path: 'product/:id', component:ProductDetailsComponent,title:"Product"},
    {  path: 'dashboard', component: DashboardComponent ,title:"Dashboard",canActivate: [AuthGuard] },
    {  path: 'order/:id', component:  OrderFormComponent,title:"Order form",canActivate: [AuthGuardUser] },
    {  path: 'company/products/:id', component: CompanyProductsComponent, title: 'Products' },
    {  path: '**', component: HomeComponent ,title:"Home"}
];
