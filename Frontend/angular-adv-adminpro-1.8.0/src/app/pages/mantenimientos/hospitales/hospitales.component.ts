import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from '../../../services/modal-image.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImageService,
    private busquedasService: SearchService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.imgSubs = this.modalImagenService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospitales());
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedasService
      .search('hospitales', termino)
      .subscribe((resp: Hospital[]) => {
        this.hospitales = resp;
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.loadHospitals().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id).subscribe((resp) => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success');
    });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.openModal('hospitales', hospital._id, hospital.img);
  }
}
