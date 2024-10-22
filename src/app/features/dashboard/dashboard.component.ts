import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Student } from './students/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  showFiller = false;
  authStudent$: Observable<Student | null>

  
  constructor(private router: Router, private authService: AuthService) {
    this.authStudent$ = this.authService.authStudent$;
  }

  logout(): void {
    this.authService.logout();
  }
}
