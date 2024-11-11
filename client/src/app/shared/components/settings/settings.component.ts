import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/services/user/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,HttpClientModule,NgIf],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  SettingsForm: FormGroup;
  @Input() user:any
 succes:string=""
  err:string=""

  constructor(private fr: FormBuilder, private userService: UserService) {



    this.SettingsForm = this.fr.group({
      username: [""],
      password: ['',[ Validators.minLength(6)]],
      confirmPassword: ['',[ Validators.minLength(6)]]
    });
  }

  submitForm():void {

    if (this.SettingsForm.invalid &&  this.SettingsForm.value.password===this.SettingsForm.value.confirmPassword) {
      this.err='Invalid form'
     return
    } 

    this.userService.updateUser(this.SettingsForm.value).subscribe({
      next: () => {
       this.succes='update succes'
      setTimeout(() => {
        window.location.reload()
      }, 1500); 
      
      },
      error: (err: any) => {
      
       this.err=err.error.msg
      },
    });

  }

}
