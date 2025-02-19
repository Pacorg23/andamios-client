import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PetitionsService } from '../../../petitions.service';
import { AndamiosService } from '../../andamios.service';
import { Seccion } from '../../models/seccion';
import { fadeInAnimation } from '../../../fadeIn';
import { SpinnerComponent } from '../../../spinner/spinner.component';

const PDF_PREFIX = '-DOC.pdf';

@Component({
  selector: 'app-subsecciones',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './subsecciones.component.html',
  styleUrl: './subsecciones.component.css',
  animations: [fadeInAnimation]
})
export class SubseccionesComponent {

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
      this.getSubseccion(name);
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
}
