import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface company {
  id: string;
  user_name: string;
  photo?: string;
}

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css',
})
export class CompanyListComponent {
  @Input() companyList: [company] | undefined;
}
