import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { AndamiosService } from '../../andamios.service';
import { Seccion } from '../../models/seccion';
import { PetitionsService } from '../../../petitions.service';
import { fadeInAnimation } from '../../../fadeIn';
import { SpinnerComponent } from '../../../spinner/spinner.component';

const PDF_PREFIX = '-DOC.pdf';

@Component({
  selector: 'app-secciones',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './secciones.component.html',
  styleUrl: './secciones.component.css',
  animations: [fadeInAnimation]
})
export class SeccionesComponent {

  seccion: Seccion = new Seccion();
  wip: boolean = false;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private andamiosService: AndamiosService, private petitionService: PetitionsService) { }

  ngOnInit() {
    this.seccion = new Seccion();
    this.initSection();
  }

  /**
   * @description Inicializa la seccion busca si es una seccion o subseccion y obtiene la informacion
   * @returns {void}
   */
  initSection(): void {
    this.wip = true;
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      this.getSection(name);
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
   * @description Obtiene la descripcion de la seccion de manera segura
   * @returns {void}
   */
  /*get sanitizedDescription(): SafeHtml {
    return this.petitionService.sanitizeHtml(this.seccion.descripcion);
  }*/

  /**
   * @description Obtiene un objeto descargable del pdf de la seccion
   * @param {string} data - Cadena de texto en base64 que cointiene un pdf
   * @returns {void}
   */
  downloadPdf(data: string): void {
    this.petitionService.readyToDownload(data, this.seccion.nombre + PDF_PREFIX);
  }

  get defaultImage(): string | undefined {
    return this.seccion?.images?.length ? this.seccion.images[0]?.file : undefined;
  }

  ngOnDestroy() {
    this.seccion = null;
  }

}

