import { afterRender, Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { fadeInAnimation } from '../../../fadeIn';
import { AndamiosService } from '../../andamios.service';
import { PetitionsService } from '../../../petitions.service';
import { Sucursal } from '../../models/sucursal';
import { Imagen } from '../../models/imagen';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../../spinner/spinner.component';

const IMG_NAME = 'andamios';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [MatIcon, SpinnerComponent],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css',
  animations: [fadeInAnimation]
})
export class SucursalesComponent implements OnInit {
  public sucursales: Sucursal[]
  public img: any
  public loading: boolean = false;

  constructor(private andamiosService: AndamiosService, private petitionsService: PetitionsService) {
    afterRender(() => {
      window.scroll(0, 0);
    });
  }

  public ngOnInit() {
    this.loading = true;
    this.obtenerImagen();
    this.loading = true;
    this.obtenerSucursales();
  }

  public obtenerImagen(): void {
    this.andamiosService.obtenerImaganSucursal(IMG_NAME).subscribe((data: Imagen) => {
      this.img = data;
      this.loading = false;
    }, (error) => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar la imagen de la sucursal',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.loading = false;
      });
    })
  }

  public obtenerSucursales(): void {
    this.andamiosService.obtenerSucursales(IMG_NAME).subscribe((data: Sucursal[]) => {
      data.forEach(element => {
        // Asegurarse de que telefono sea un string
        const telefonoStr = String(element.telefono); // Convertir a string si no lo es
        const telefonos = telefonoStr.split(','); // Ahora siempre es un string, seguro para usar split
        const arrTelefonos = telefonos.map(tel => tel.trim()); // Opcional: eliminar espacios adicionales
        element.telefono = arrTelefonos; // Asignar el array si el campo telefono es any
      });
      this.sucursales = data;
      this.loading = false;
    }, (error) => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar las sucursales',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.loading = false;
      });
    });
  }
}
