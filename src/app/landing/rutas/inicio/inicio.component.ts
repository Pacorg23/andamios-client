import { afterRender, Component } from '@angular/core';
import { fadeInAnimation } from '../../../fadeIn';
import { SeoService } from '../../../seo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  animations: [fadeInAnimation]
})
export class InicioComponent {

  constructor(private seo: SeoService, private router: Router) {
    afterRender(() => {
      window.scrollTo(0, 0);
      this.seo.setTitle("Andamios Atlas");
      this.seo.setKeywords([
        "Andamios Atlas",
        "Andamios Atlás, el mayor líder en renta y venta de andamios en el mercado.",
        "inicio"
      ])
    })
  }

  /**
   * @description Método para navegar a una ruta específica.
   * @param {string} direccion - La dirección a la que se desea navegar.
   * @returns void
   */
  public irA(direccion: string): void {
    this.router.navigate([direccion])
  }

}
