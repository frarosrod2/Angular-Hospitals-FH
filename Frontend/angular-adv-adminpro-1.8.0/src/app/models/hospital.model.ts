import { environment } from '../../environments/environment.prod';

const baseURL = environment.baseURL;

interface _HospitalUser {
  _id: string;
  img: string;
  nombre: string;
}

export class Hospital {
  constructor(
    public _id: string,
    public nombre: string,
    public img?: string,
    public usuario?: _HospitalUser
  ) {}
}
