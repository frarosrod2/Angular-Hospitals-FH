import { LoginForm } from './../interfaces/login-form.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
}
