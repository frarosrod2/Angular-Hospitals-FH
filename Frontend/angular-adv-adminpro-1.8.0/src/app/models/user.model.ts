import { environment } from '../../environments/environment.prod';

const baseURL = environment.baseURL;
export class User {
  constructor(
    public email: string,
    public name: string,
    public password?: string,
    public google?: string,
    public img?: string,
    public role?: string,
    public uid?: string
  ) {}

  get imagenUrl() {
    //upload/usuarios/no-image
    if (this.img) {
      return this.img;
    } else {
      return `./assets/images/users/1.jpg`;
    }
  }
}
