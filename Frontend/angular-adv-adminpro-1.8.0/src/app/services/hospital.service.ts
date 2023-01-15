import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
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

  loadHospitals() {
    const url = `${baseURL}/hospitales`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; hospitales: Hospital[] }) => resp.hospitales)
      );
  }
  createHospital(nombre: string) {
    const url = `${baseURL}/hospitales`;
    return this.http.post(url, { nombre }, this.headers);
  }
  updateHospital(_id: string, nombre: string) {
    const url = `${baseURL}/hospitales/${_id}`;
    return this.http.put(url, { nombre }, this.headers);
  }
  deleteHospital(_id: string) {
    const url = `${baseURL}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
