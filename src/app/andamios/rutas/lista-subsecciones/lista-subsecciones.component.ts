import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AndamiosService } from '../../andamios.service';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import { Seccion } from '../../models/seccion';
import _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-subsecciones',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './lista-subsecciones.component.html',
  styleUrl: './lista-subsecciones.component.css'
})
export class ListaSubseccionesComponent {

  public wip: boolean = false;
  public subsecciones: Seccion[] = [];
  public title: string = '';

  constructor(private route: ActivatedRoute, private andamiosService: AndamiosService) { }

  ngOnInit() {
    this.wip = true;
    this.selectSection();
  }

  public selectSection(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      this.title = _.capitalize(name);
      this.getSubsecciones(name);
      this.wip = false;
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar la sección',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.wip = false;
      });
    });
  }

  public getSubsecciones(subseccion: string): void {
    this.andamiosService.obtenerSubseccionPorSeccion(subseccion).subscribe((data) => {
      this.subsecciones = data;
      this.wip = false;
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar las subsecciones',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.wip = false;
      });
    }
  );
  }
}
