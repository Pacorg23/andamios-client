import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AndamiosService } from '../../andamios.service';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import { Seccion } from '../../models/seccion';
import _ from 'lodash';

@Component({
  selector: 'app-lista-subsecciones',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './lista-subsecciones.component.html',
  styleUrl: './lista-subsecciones.component.css'
})
export class ListaSubseccionesComponent {

  wip: boolean = false;
  subsecciones: Seccion[] = [];
  title: string = '';

  constructor(private route: ActivatedRoute, private andamiosService: AndamiosService) { }

  ngOnInit() {
    this.wip = true;
    this.selectSection();
  }

  selectSection() {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      this.title = _.capitalize(name);
      this.getSubsecciones(name);
      this.wip = false;
    });
  }

  getSubsecciones(subseccion) {
    this.andamiosService.obtenerSubseccionPorSeccion(subseccion).subscribe((data) => {
      this.subsecciones = data;
      this.wip = false
    });
  }
}
