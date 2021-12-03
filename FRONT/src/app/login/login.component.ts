import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  invalidCredentials: boolean = false;
  invalidForm: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required])
    })
  }

  getToken() {
    this.invalidCredentials = false;
    this.invalidForm = false;

    if (this.loginForm.status === "VALID") {
      this.authService.getAuthToken(this.loginForm.value)
        .subscribe(token => {
          if (token === null) {
            this.invalidCredentials = true;
            console.log('não consegui pegar o token');
          } else {
            localStorage.setItem('token', token);
            this.router.navigateByUrl('kanban-board');
          }
        });
    } else {
      this.invalidForm = true;
    }
  };
}
