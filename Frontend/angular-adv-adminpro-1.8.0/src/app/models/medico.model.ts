import { Hospital } from './hospital.model';
import { environment } from '../../environments/environment';

const baseURL = environment.baseURL;

interface _MedicoUser {
  _id: string;
  img: string;
  nombre: string;
}

export class Medico {
  constructor(
    public _id: string,
    public nombre: string,
    public img?: string,
    public usuario?: _MedicoUser,
    public hospital?: Hospital
  ) {}
}
