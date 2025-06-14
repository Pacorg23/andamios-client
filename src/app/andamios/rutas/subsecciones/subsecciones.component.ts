import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PetitionsService } from '../../../petitions.service';
import { AndamiosService } from '../../andamios.service';
import { Seccion } from '../../models/seccion';
import { fadeInAnimation } from '../../../fadeIn';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import Swal from 'sweetalert2';

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

  public seccion: Seccion = new Seccion();
  public wip: boolean = false;

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
  public initSection(): void {
    this.wip = true;
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      this.getSubseccion(name);
    });
  }

  /**
   * @description Obtiene una subseccion usando el nombre de url
   * @param {string} name - Nombre de la subseccion
   * @returns {void}
   */
  public getSubseccion(name: string): void {
    this.andamiosService.obtenerSubseccion(name).subscribe((data) => {
      this.seccion = data;
      this.wip = false;
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar la subsección',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.wip = false;
      });
    }
  );
  }

  /**
   * @description Obtiene un objeto descargable del pdf de la seccion
   * @param {string} data - Cadena de texto en base64 que cointiene un pdf
   * @returns {void}
   */
  public downloadPdf(data: string): void {
    this.petitionService.readyToDownload(data, this.seccion.nombre + PDF_PREFIX);
  }

  /**
   * @description Obtiene la imagen por defecto de la seccion
   * @return {string | undefined} - Retorna la primera imagen de la seccion o undefined si no hay imagenes
   */
  public get defaultImage(): string | undefined {
    return this.seccion?.images?.length ? this.seccion.images[0]?.file : undefined;
  }
}
