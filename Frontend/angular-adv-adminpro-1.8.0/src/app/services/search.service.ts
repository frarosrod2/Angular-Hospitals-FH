import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformUsers(res: any): User[] {
    return res.map(
      (user: any) =>
        new User(
          user.email,
          user.name,
          '',
          user.img,
          user.google,
          user.role,
          user.uid
        )
    );
  }

  search(type: 'usuarios' | 'medicos' | 'hospitales', term = '') {
    const url = `${baseURL}/todo/coleccion/${type}/${term}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'usuarios':
            return this.transformUsers(resp.resultados);
          case 'usuarios':
            break;
          case 'usuarios':
            break;
          default:
            return [];
        }
      })
    );
  }
}
