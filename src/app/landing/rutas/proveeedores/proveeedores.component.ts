import { afterRender, Component } from '@angular/core';
import { LandingService } from '../../landing.service';
import { Comunicado } from '../../models/comunicado';
import { Archivo } from '../../models/archivo';
import { PetitionsService } from '../../../petitions.service';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../../../fadeIn';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SeoService } from '../../../seo.service';
import _ from 'lodash';

const ALTA = 'alta';
const EFACTURA = 'efactura';
const COMUNICADOS = 'comunicados';
const PROVEEDORES = 'proveedores';
const ZERO = '0';
const ZERO_INDEX = 0;
const DATE_INDEX = 'T';
const TWO = 2;
const SECTION = 'seccion';
const EMPTY_STRING = '';

@Component({
  selector: 'app-proveeedores',
  standalone: true,
  imports: [],
  templateUrl: './proveeedores.component.html',
  styleUrl: './proveeedores.component.css',
  animations: [fadeInAnimation]
})
export class ProveeedoresComponent {

  archivo: any;
  archivoB64: any;
  accion: any;
  comunicados: Comunicado[] = [];
  loading: boolean = false;
  fileName: string = _.upperCase(PROVEEDORES);

  constructor(private landingService: LandingService,
    private helpers: PetitionsService, private activatedRoute: ActivatedRoute,
    private seo: SeoService) {


    afterRender(() => {
      window.scroll(0, 0);
    })
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      this.accion = params.get(SECTION);
      this.seo.setTitle("Proveedores | " + this.accion.toUpperCase());
      if (_.isEqual(this.accion, ALTA) || _.isEqual(this.accion, EFACTURA)) {
        this.obtenerArchivo();
        this.seo.setKeywords([
          "Proveedores | " + this.accion,
          "Andamios Atlas pone disposición de sus proveedores los formatos necesarios para realizar trámites y gestiones con la empresa.",
          "proveedores/" + this.accion
        ])
      } else if (_.isEqual(this.accion, COMUNICADOS)) {
        this.obtenerComunicados();
        this.seo.setKeywords([
          "Proveedores | Comunicados",
          "Andamios Atlas pone disposición de sus proveedores los comunicados más recientes para mantenerlos informados de los cambios y noticias de la empresa.",
          "proveedores/comunicados"
        ])
      }
      this.loading = false;
    })
  }

  public obtenerArchivo(): void {
    this.landingService.obtenerArchivo(PROVEEDORES).subscribe((res: any) => {
      this.archivo = this.helpers.sanitizarPdf(res.file);
      this.archivoB64 = res.file;
      this.loading = false;
    });
  }

  public obtenerComunicados(): void {
    this.landingService.obtenerComunicados().subscribe((res: any) => {
      res.forEach(comunicado => {
        (comunicado.createdAt + EMPTY_STRING).indexOf(DATE_INDEX) >= ZERO_INDEX
          ? comunicado.createdAt = this.formatDateToDDMMYYYY(comunicado.createdAt) : comunicado.createdAt;
      });
      this.comunicados = res;
      this.loading = false
    })
  }

  public formatDateToDDMMYYYY(isoDateString: string): string {
    const date = new Date(isoDateString);

    // Obtener día, mes y año
    const day = date.getUTCDate().toString().padStart(TWO, ZERO); // Asegura que siempre tenga 2 dígitos
    const month = (date.getUTCMonth() + 1).toString().padStart(TWO, ZERO); // Los meses empiezan desde 0
    const year = date.getUTCFullYear();

    // Formatear en dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }

  public downloadPdf(): void {
    this.helpers.readyToDownload(this.archivoB64, this.fileName);
  }
}
