import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updatePhoto(
    file: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${baseURL}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', file);

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });
      const data = await res.json();
      console.log('data', data);
      return data?.nombreArchivo;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
