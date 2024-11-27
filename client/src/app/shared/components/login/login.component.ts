import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm: FormGroup;
  error: string | null = null;

  @Input() LoginActive: boolean | undefined;
  @Output() return = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  cancel(value: boolean) {
    this.return.emit(value);
   }
 

  onSubmit(): void {
    this.AuthService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loginForm.reset();
        this.cancel(false)
      },
      error: (err: any) => {
        if (err.error.errors) {
          return (this.error = err.error.errors[0].msg);
        }
        this.error = err.error.msg;
        throw err;
      },
    });
  }
}
