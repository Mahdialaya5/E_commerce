import { Component} from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CompanyListComponent } from '../../../shared/components/company-list/company-list.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { UserService } from '../../../core/services/user/user.service';


interface company {
  id:string;
  user_name:string;
  photo?:string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,CompanyListComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  companyList:[company]| undefined;

  constructor( private UserService: UserService ) {}

  ngOnInit(){
    this.UserService.getCompany().subscribe(
      {next: (res:any) => {
      this.companyList=res;
    },
    error: (err: any) => {
     throw err
  }})

  }
  
}
