import { afterRender, Component } from '@angular/core';
import { LandingService } from '../../landing.service';
import { PetitionsService } from '../../../petitions.service';
import { fadeInAnimation } from '../../../fadeIn';
import { SeoService } from '../../../seo.service';
import _ from 'lodash';

const CLIENTES = 'clientes';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
  animations: [fadeInAnimation],
})
export class ClientesComponent {

  archivo: any
  archivoB64: any
  loading: boolean = false
  private alreadyScrolled: boolean = false;

  constructor(private landingService: LandingService, private petition: PetitionsService,
    private seo: SeoService
  ) {
    afterRender(() => {
      if (!this.alreadyScrolled) {
        this.alreadyScrolled = true;
        window.scroll(0, 0);
      }
    })
    this.loading = true;
    this.obtenerArchivo();
    this.seo.setTitle(_.upperFirst(CLIENTES));
    this.seo.setKeywords([
      'Clientes',
      'Andamios Atlas pone a su disposicion un portal para clientes donde podra descargar los archivos necesarios para realizar sus pedidos.',
      'clientes'
    ])
  }

  public obtenerArchivo(): void {
    this.landingService.obtenerArchivo(CLIENTES).subscribe((res: any) => {
      this.archivo = this.petition.sanitizarPdf(res.file);
      this.archivoB64 = res.file;
      this.loading = false;
    });
  }

  public descargarArchivo(): void {
    this.petition.readyToDownload(this.archivoB64, _.toUpper(CLIENTES));
  }

}
