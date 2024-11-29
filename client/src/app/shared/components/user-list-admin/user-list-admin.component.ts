import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { NgIf } from '@angular/common';

interface user {
  id:string;
  photo:string;
  email:string;
  user_name:string;
}

@Component({
  selector: 'app-user-list-admin',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-list-admin.component.html',
  styleUrl: './user-list-admin.component.css'
})
export class UserListAdminComponent {

   users:[user]|undefined

  constructor(
      private userServices: UserService,
   ) {}

  ngOnInit() {
      this.userServices.getUsers().subscribe({
          next: (res: any) => {
            this.users = res;},
          error: (error: any) => {
            throw error;
          },
        });
      }
    }


