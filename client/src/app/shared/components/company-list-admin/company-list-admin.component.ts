import { Component} from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { NgIf } from '@angular/common';


interface company {
  id: string;
  user_name: string;
  photo: string;
  email:string;
}
@Component({
  selector: 'app-company-list-admin',
  standalone: true,
  imports: [NgIf],
  templateUrl: './company-list-admin.component.html',
  styleUrl: './company-list-admin.component.css'
})
export class CompanyListAdminComponent {

   companyList: [company] | undefined;

  constructor( private userServices: UserService,) {}

ngOnInit() {
    this.userServices.getCompanyForAdmin().subscribe({
        next: (res: any) => {
          this.companyList= res;},
        error: (error: any) => {
          throw error;
        },
      });
    }
}
