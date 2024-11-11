import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,HttpClientModule,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  loginForm: FormGroup;
  MenuActive:boolean= false;
  LoginActive:boolean=false
  isLogged:boolean | undefined
  error:string|null=null;

  ngOnInit(){
    this.AuthService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.isLogged=true
      } else {
        this.isLogged=false
      }
    });
  }
  constructor(private fb: FormBuilder, private AuthService: AuthService) {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });

  }
  
  toggleMenu():void {
    this.MenuActive = !this.MenuActive;
  }
  
  toggletoLogin():void {
    this.LoginActive = !this.LoginActive;
}

  toggleLogin(event:Event):void {
    event.preventDefault();
  this.LoginActive = !this.LoginActive;
}
 
Logout():void{
  this.AuthService.logout()
}
  

  onSubmit():void{
   
      this.AuthService.login(this.loginForm.value).subscribe({
        next: () => {
          this.LoginActive=false
          this.loginForm.reset();
        },
        error: (err: any) => {
          if (err.error.errors) {
            return   this.error=err.error.errors[0].msg
           
          }
             this.error=err.error.msg
             throw err
        }
      });
      
}

}

