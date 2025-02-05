import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { AndamiosService } from '../../andamios.service';

const SECCION = 'seccion';
const SUBSECCION = 'subseccion';

@Component({
  selector: 'app-secciones',
  standalone: true,
  imports: [],
  templateUrl: './secciones.component.html',
  styleUrl: './secciones.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeccionesComponent {

  isSubsection = false;
  isSection = false;

  /* DELETE */

  sanitizedHtml: any;
  title: string = 'Andamio Convencional';

  /* */

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private andamiosService: AndamiosService) { }

  ngOnInit() {

    /* DELETE */
    const rawHtml = `
      <p>Nuestras torres de trabajo cuentan con un manejo extraordinario y pueden adaptarse a cada proyecto de mantenimiento. Su montaje es muy sencillo y ligero, sus marcos en H fabricados de acero estructural son más fáciles de llevar y montar.</p>
      <h3>Ventajas:</h3>
      <ul>
        <li>Su composición es de acero estructural.</li>
        <li>Manejo sencillo, cuenta con un orden de montaje lógico y trabajo rápido.</li>
        <li>Máxima seguridad.</li>
        <li>Para utilizarse en apuntalamientos.</li>
        <li>Para un trabajo rápido y seguro, contamos con marcos con posibilidad de paso peatonal bajo el armado del equipo.</li>
      </ul>
      <h3>Consideraciones para cotizar una torre de trabajo:</h3>
      <ul>
        <li>Número de personas que lo usarán.</li>
        <li>Altura necesaria de la torre.</li>
        <li>Troquelamiento de la torre.</li>
        <li>Longitud de la torre de trabajo.</li>
        <li>Tipo de acceso a los niveles de trabajo.</li>
      </ul>
    `;
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
    /* */

    this.route.paramMap.subscribe(params => {
      this.isSection = false;
      this.isSubsection = false;
      const currentRoute = this.route.snapshot.url.map(segment => segment.path).join('/');
      const routeSegments = currentRoute.split('/');
      const name = params.get('name');

      if (routeSegments.includes(SECCION) && !_.isEmpty(name)) {
        this.isSection = true;
        this.getSection(name);
      } else if (routeSegments.includes(SUBSECCION) && !_.isEmpty(name)) {
        this.isSubsection = true;
      } else {
        this.isSection = false;
        this.isSubsection = false;
      }
    });
  }

  /*
  * @description Obtiene una seccion usando el nombre de url
  */
  getSection(name: string) {
    this.andamiosService.obtenerSeccion(name).subscribe((data) => {
      console.log(data);
    });
  }
}

