import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private _hideModal = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }
  openModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-image'
  ) {
    this._hideModal = false;
    this.tipo = tipo;
    this.id = id;
    if (img) {
      this.img = `${baseURL}/upload/${tipo}/${img}`;
    }
    console.log('this.img', this.img);
  }
  closeModal() {
    return (this._hideModal = true);
  }

  constructor() {}
}
