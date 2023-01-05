import { LoginForm } from './../interfaces/login-form.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoadUserResponse } from '../interfaces/load-users.interface';
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

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${baseURL}/login/renew`, this.headers).pipe(
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

  updateUser(data: { email: string; name: string; role: string }) {
    data = {
      ...data,
      role: this.user.role,
    };
    return this.http.put(`${baseURL}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
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
  loadUsers(desde: number = 0) {
    const url = `${baseURL}/usuarios?desde=${desde}`;
    return this.http.get<LoadUserResponse>(url, this.headers).pipe(
      map((resp) => {
        const users = resp.usuarios.map(
          (user: any) =>
            new User(
              user.email,
              user.nombre,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );
        return { total: resp.total, usuarios: users };
      })
    );
  }
}
