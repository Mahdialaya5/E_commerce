import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
   
  @Output() toggledashboard = new EventEmitter<string>()
  @Input() user:any
   constructor(private AuthService:AuthService ){}

  toggle(value: string) {
     this.toggledashboard.emit(value) }

    Logout():void{
      this.AuthService.logout()
    }
}
