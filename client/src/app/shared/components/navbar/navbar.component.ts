import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  MenuActive: boolean = false;
  LoginActive: boolean = false;
  isLogged: boolean | undefined;

  ngOnInit() {
    this.AuthService.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }
  constructor(private AuthService: AuthService) {}

  toggleMenu(): void {
    this.MenuActive = !this.MenuActive;
  }

  toggletoLogin(): void {
    this.LoginActive = true
  }
  return(event:boolean):void{
    this.LoginActive=event
  } 
 
  Logout(): void {
    this.AuthService.logout();
  }
}
