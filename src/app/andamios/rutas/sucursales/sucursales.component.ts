import { afterRender, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { fadeInAnimation } from '../../../fadeIn';
import { AndamiosService } from '../../andamios.service';
import { PetitionsService } from '../../../petitions.service';
import { Sucursal } from '../../models/sucursal';
import { after } from 'node:test';
import { Imagen } from '../../models/imagen';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css',
  animations: [fadeInAnimation]
})
export class SucursalesComponent {
  sucursales: Sucursal[]
  img: any
  loading: boolean = false;

  constructor(private andamiosService: AndamiosService, private petitionsService: PetitionsService) {

    this.loading = true;
    this.obtenerImagen();
    this.obtenerSucursales()

    afterRender(() => {
      window.scroll(0, 0);
    })

    this.loading = false;
  }

  obtenerImagen() {
    this.andamiosService.obtenerImaganSucursal('andamios').subscribe((data: Imagen) => {
      //data.file = this.petitionsService.sanitizar(data.file);
      this.img = data;
    }
    )
  }

    obtenerSucursales() {
    this.andamiosService.obtenerSucursales('andamios').subscribe((data: Sucursal[]) => {
      data.forEach(element => {
        // Asegurarse de que telefono sea un string
        const telefonoStr = String(element.telefono); // Convertir a string si no lo es
        const telefonos = telefonoStr.split(','); // Ahora siempre es un string, seguro para usar split
        const arrTelefonos = telefonos.map(tel => tel.trim()); // Opcional: eliminar espacios adicionales
        element.telefono = arrTelefonos; // Asignar el array si el campo telefono es any
      });
      this.sucursales = data;
    })
  }
}
