import Swal from 'sweetalert2';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/user.model';

import { UserService } from '../../../services/user.service';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsers = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public desde = 0;
  public loading = true;
  public imgSubs: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe(() => this.loadUsers());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsers = total;
      this.users = usuarios;
      this.usersTemp = usuarios;
      this.loading = false;
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

  search(term: string) {
    if (term.length === 0) {
      return (this.users = this.usersTemp);
    }
    this.searchService
      .search('usuarios', term)
      .subscribe((resp) => (this.users = resp));
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'No puede borrarse a sí mismo', 'error');
    }

    Swal.fire({
      title: 'Borrar usuario',
      text: `Esta  a punto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((resp) => {
          this.loadUsers();
          Swal.fire(
            'Usuario borrado',
            `${user.name} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

  updateRole(user: User) {
    this.userService.saveUser(user).subscribe((resp) => console.log(resp));
  }

  openModal(user: User) {
    this.modalImageService.openModal('usuarios', user.uid);
  }
}
