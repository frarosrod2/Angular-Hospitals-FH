import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  public totalUsers = 0;
  public users: User[] = [];
  public desde = 0;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.loadUsers(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsers = total;
      this.users = usuarios;
    });
  }

  changePage(value: number) {
    this.desde += value;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsers) {
      this.desde -= value;
    }
    this.loadUsers();
  }
}
