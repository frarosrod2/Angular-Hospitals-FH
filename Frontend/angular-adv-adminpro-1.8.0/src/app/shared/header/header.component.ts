import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public imgUrl = '';
  public user: User;

  constructor(private userService: UserService) {
    this.imgUrl = userService.user.imagenUrl || './assets/images/users/1.jpg';
    this.user = userService.user;
  }

  logout() {
    this.userService.logout();
  }
}
