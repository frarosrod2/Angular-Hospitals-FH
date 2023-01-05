import { User } from '../models/user.model';

export interface LoadUserResponse {
  total: number;
  usuarios: User[];
}
