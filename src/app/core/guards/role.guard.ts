import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}

    private showError(message: string): void {
        this.snackBar.open(message, undefined, {
            duration: 3000
        });
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.authStudent$.pipe(
      take(1), 
      map(student => {
        if (student && student.role === 'admin') {
          return true;
        } else {
          this.router.navigate(['dashboard','home']);
          this.showError('No tienes permisos para acceder a esta página');
          return false;
        }
      })
    );
  }
}
