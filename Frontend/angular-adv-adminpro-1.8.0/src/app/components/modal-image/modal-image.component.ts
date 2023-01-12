import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  public imageToUpload: File;
  public imgTemp: any = null;

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modalImageService.closeModal();
    this.imgTemp = null;
  }

  updatePhoto(file: File) {
    this.imageToUpload = file;
    if (!file) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImage() {
    const id = this.modalImageService.id;
    const tipo = this.modalImageService.tipo;

    this.fileUploadService
      .updatePhoto(this.imageToUpload, tipo, id)
      .then((img) => {
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        this.closeModal();
      })
      .catch((err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
