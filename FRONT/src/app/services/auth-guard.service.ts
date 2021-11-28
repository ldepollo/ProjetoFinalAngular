import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['not-found']);
    }
    return true
  }
}
