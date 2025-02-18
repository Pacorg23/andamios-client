import { afterRender, Component } from '@angular/core';
import { LandingService } from '../../landing.service';
import { Comunicado } from '../../models/comunicado';
import { Archivo } from '../../models/archivo';
import { PetitionsService } from '../../../petitions.service';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../../../fadeIn';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SeoService } from '../../../seo.service';

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
  archivoB64: any
  accion: any
  comunicados: Comunicado[] = []
  loading: boolean = false

  constructor(private landingService: LandingService,
    private helpers: PetitionsService, private activatedRoute: ActivatedRoute,
  private seo:SeoService) {


    afterRender(() => {
      window.scroll(0, 0);
    })
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      this.accion = params.get('seccion');
      this.seo.setTitle("Proveedores | "+ this.accion.toUpperCase());
      if (this.accion === 'alta' || this.accion === 'efactura') {
        this.obtenerArchivo();
        this.seo.setKeywords([
          "Proveedores | " + this.accion,
          "Andamios Atlas pone disposición de sus proveedores los formatos necesarios para realizar trámites y gestiones con la empresa.",
          "proveedores/" + this.accion
        ])
      } else if (this.accion === 'comunicados') {
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

  obtenerArchivo() {
    this.landingService.obtenerArchivo('proveedores').subscribe((res: any) => {
      this.archivo = this.helpers.sanitizarPdf(res.file);
      this.archivoB64 = res.file;
      this.loading = false;
    });
  }

  obtenerComunicados() {
    this.landingService.obtenerComunicados().subscribe((res: any) => {
      res.forEach(comunicado => {
        // const dateInMilliseconds = Date.parse(comunicado.createdAt);
        // const formattedDate = new Date(dateInMilliseconds).toLocaleDateString('es-MX', {
          //   year: 'numeric',
          //   month: 'numeric',
          //   day: 'numeric',
          //   hour: 'numeric',
          //   minute: 'numeric',
          // });
        (comunicado.createdAt + '').indexOf('T')>=0 ?comunicado.createdAt= this.formatDateToDDMMYYYY(comunicado.createdAt): comunicado.createdAt;
      });
      this.comunicados = res;
      this.loading = false
    })
  }
  formatDateToDDMMYYYY(isoDateString: string): string {
    const date = new Date(isoDateString);
  
    // Obtener día, mes y año
    const day = date.getUTCDate().toString().padStart(2, '0'); // Asegura que siempre tenga 2 dígitos
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getUTCFullYear();
  
    // Formatear en dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }
  downloadFile(fileName: string, base64Content: string): void {
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Crear un objeto URL a partir del Blob
    const url = URL.createObjectURL(blob);

    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Simular clic en el enlace temporal
    link.dispatchEvent(new MouseEvent('click'));

    // Liberar el objeto URL
    URL.revokeObjectURL(url);
  }
}
