import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['Password', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        console.log('Usuario logeado');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
    this.router.navigateByUrl('/');
  }
}
