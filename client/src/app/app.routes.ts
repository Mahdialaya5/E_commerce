import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { RegisterComponent } from './features/pages/register/register.component';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';

export const routes: Routes = [
  
    {  path: '', component: HomeComponent ,title:"Home"},
    {  path: 'register', component: RegisterComponent ,title:"Register"},
    {  path: 'dashboard', component: DashboardComponent ,title:"dashboard"},
];
