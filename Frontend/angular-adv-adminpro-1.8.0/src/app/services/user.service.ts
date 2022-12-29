import { LoginForm } from './../interfaces/login-form.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User;

  constructor(private http: HttpClient, private router: Router) {}

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${baseURL}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp: any) => {
          console.log(resp);
          const { email, google, nombre, role, uid, img = '' } = resp.usuario;
          this.user = new User(email, nombre, '', google, img, role, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${baseURL}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  login(formData: LoginForm) {
    return this.http.post(`${baseURL}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');

    this.router.navigateByUrl('/login');
  }
}
