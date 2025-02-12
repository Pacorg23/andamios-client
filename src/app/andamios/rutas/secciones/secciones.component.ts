import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { AndamiosService } from '../../andamios.service';
import { Seccion } from '../../models/seccion';
import { PetitionsService } from '../../../petitions.service';
import { fadeInAnimation } from '../../../fadeIn';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import { Subject, takeUntil, timeout } from 'rxjs';

const SECCION = 'seccion';
const SUBSECCION = 'subseccion';
const PDF_PREFIX = '-DOC.pdf';

@Component({
  selector: 'app-secciones',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './secciones.component.html',
  styleUrl: './secciones.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class SeccionesComponent {

  isSubsection: boolean = false;
  isSection: boolean = false;
  seccion: Seccion = new Seccion();
  wip: boolean = false;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private andamiosService: AndamiosService, private petitionService: PetitionsService) { }

  ngOnInit() {
    this.initSection();
  }

  /**
   * @description Inicializa la seccion busca si es una seccion o subseccion y obtiene la informacion
   * @returns {void}
   */
  initSection(): void {
    this.wip = true;
    this.route.paramMap.subscribe(params => {
      this.isSection = false;
      this.isSubsection = false;
      const currentRoute = this.route.snapshot.url.map(segment => segment.path).join('/');
      const routeSegments = currentRoute.split('/');
      const name = params.get('name');

      setTimeout(() => {}, 1000);

      if (routeSegments.includes(SECCION) && !_.isEmpty(name)) {
        this.isSection = true;
        this.getSection(name);
      } else if (routeSegments.includes(SUBSECCION) && !_.isEmpty(name)) {
        this.isSubsection = true;
        this.getSubseccion(name);
      } else {
        this.isSection = false;
        this.isSubsection = false;
      }
      this.wip = false;
    });
  }

  /**
   * @description Obtiene una seccion usando el nombre de url
   * @param {string} name - Nombre de la seccion
   * @returns {void}
   */
  getSection(name: string): void {
    this.andamiosService.obtenerSeccion(name).subscribe((data) => {
      this.seccion = data;
      this.wip = false;
    });
  }

  /**
   * @description Obtiene una subseccion usando el nombre de url
   * @param {string} name - Nombre de la subseccion
   * @returns {void}
   */
  getSubseccion(name: string): void {
    this.andamiosService.obtenerSubseccion(name).subscribe((data) => {
      this.seccion = data;
      this.wip = false;
    });
  }

  /**
   * @description Obtiene la descripcion de la seccion de manera segura
   * @returns {void}
   */
  get sanitizedDescription(): SafeHtml {
    return this.petitionService.sanitizeHtml(this.seccion.descripcion);
  }

  /**
   * @description Obtiene un objeto descargable del pdf de la seccion
   * @param {string} data - Cadena de texto en base64 que cointiene un pdf
   * @returns {void}
   */
  downloadPdf(data: string): void {
    this.petitionService.readyToDownload(data, this.seccion.nombre + PDF_PREFIX);
  }

  ngOnDestroy() {
    this.seccion = null;
  }

}

