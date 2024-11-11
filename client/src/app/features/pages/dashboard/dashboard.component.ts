import { Component, Input} from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { OverviewComponent } from '../../../shared/components/overview/overview.component';
import { NgIf } from '@angular/common';
import { SettingsComponent } from '../../../shared/components/settings/settings.component';
import { AuthService } from '../../../core/auth/auth.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,OverviewComponent,SettingsComponent,NgIf,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  toggle:string="Overview"
  @Input()  user:any=""
  isLogged:boolean | undefined

  constructor(private AuthService: AuthService) {}

  toggledashboard(event:string):void{
     this.toggle=event
   }

   ngOnInit() {

    this.AuthService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.AuthService.getCurrentUser().subscribe({
          next: (res: any) => {
            this.user = res;
            
          },
          error: (error: any) => {
           throw error
          }
        });
      } else {
        this.isLogged=false
      }
    });
    
  }





}
