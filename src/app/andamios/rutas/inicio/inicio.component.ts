import { afterRender, Component } from '@angular/core';
import { AndamiosService } from '../../andamios.service';
import { Carrusel } from '../../models/carrusel';
import { fromEvent } from 'rxjs';
import { PetitionsService } from '../../../petitions.service';
import { Anuncio } from '../../models/anuncio';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import { SeoService } from '../../../seo.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  slides: Carrusel[]
  anuncio: Anuncio
  elementos: any
  actual: number
  slide: string;
  private resizeSubscription: any;
  imgResponsive: boolean = false;
  loading: boolean = false

  seoTags: string

  constructor(private andamiosService: AndamiosService,
    private petitionsService: PetitionsService, private seo: SeoService) {

    this.seo.setTitle("Andamios Atlas")

    this.loading = true;
    this.obtenerCarrusel()
    this.obtenerAnuncio()
    this.obtenerInicio()

    afterRender(() => {
      window.scrollTo(0, 0)
      this.resizeSubscription = fromEvent(window, 'resize').subscribe(() => {
        if (window.innerWidth < 749) {
          this.imgResponsive = true
        } else {
          this.imgResponsive = false
        }
      });

      if (window.innerWidth < 749) {
        this.imgResponsive = true
      } else {
        this.imgResponsive = false
      }

    })
  }

  ngAfterViewInit() {

  }

  obtenerCarrusel() {
    this.andamiosService.obtenerCarrusel().subscribe((data) => {
      this.slides = data;
    })
  }

  obtenerAnuncio() {
    this.andamiosService.obtenerAnuncio().subscribe((data) => {
      this.anuncio = data
    })
  }

  obtenerInicio() {
    this.andamiosService.obtenerInicio().subscribe((data: any[]) => {

      this.elementos = data;

      console.log(this.elementos)

      this.elementos.forEach(element => {
        if (element.secciones.length > 0) {
          element.secciones.forEach(seccion => {
            this.seo.setKeywords([
              element.titulo,
              seccion.nombre
            ])
          })
        }
      });


      this.loading = false;
    })
  }


}
