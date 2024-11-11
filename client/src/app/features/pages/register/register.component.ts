import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/services/user/user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  registerForm: FormGroup;
  showPassword = false;
 

  constructor(private fr: FormBuilder, private userService: UserService) {

    this.registerForm = this.fr.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      role: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
     file:[null]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

 onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const file = fileInput.files[0];
      this.registerForm.patchValue({ file }); 
    }
  }

  submitForm() {
    if (this.registerForm.invalid) {
      alert(this.registerForm.errors);
    } else {
      var formData = new FormData();
      for (const key in this.registerForm.value) {
        if (this.registerForm.value[key] !== null) {
          formData.append(key, this.registerForm.value[key]);
        }
      }
  this.userService.register(formData).subscribe({
        next: () => {
          this.registerForm.reset();
        },
        error: (err: any) => {
      confirm(err.error.msg ?err.error.msg : err.error.errors[0].msg )
        },
      });
    }
  }
}
