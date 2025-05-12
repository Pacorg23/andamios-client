import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fadeInAnimation } from '../../../fadeIn';
import { DomSanitizer } from '@angular/platform-browser';
import _ from 'lodash';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LandingService } from '../../conten.service';
// register Swiper custom elements
register();
@Component({
  selector: 'app-ingenieria',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './ingenieria.component.html',
  styleUrl: './ingenieria.component.css',
  animations: [fadeInAnimation],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IngenieriaComponent {

  designs = [
    {
      id: 1, description: this.sanitizer.bypassSecurityTrustHtml(`
      Utilizando nuestra experiencia en el diseño de propuestas hechas a la medida para cada necesidad.<br>
      <br>
      Ofrecemos una amplia variedad de diseños, desarrollados a partir de programas especializados compatibles con cualquier software que nuestros clientes utilicen.<br>
      Cada proyecto es diseñado por un equipo con amplia experiencia, conocimiento y creatividad, utilizando nuestros equipos de alta tecnología para su desarrollo.
    `), imgs: [
        { id: 1, img: 'assets/imagenes/ingenieria/ing1.jpg' },
        { id: 2, img: 'assets/imagenes/ingenieria/ing2.jpg' },
        { id: 3, img: 'assets/imagenes/ingenieria/ing3.jpg' }
      ]
    }
  ]
  Secciones

  //CAROUSEL//
  slidesPer: number = 1;
  loop: boolean = true;
  speed: number = 1000;
  brakePoints: any = {
    640: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 3,
    },
  };
  width: string = "80%";
  height: string = "auto";
  imgWidth: string = "80%";
  imgHeight: string = "300px";
  mainUrl: string = '/';
  destinyUrl: string = '/';
  autoplay: any = {
    delay: 3000,
    disableOnInteraction: true,
    pauseOnMouseEnter: true
  }

  constructor(private sanitizer: DomSanitizer,
    private contenService: LandingService) {
    this.contenService.obtenerCategoria("diseno-e-ingenieria").subscribe((categoria) => {
      this.Secciones= categoria.sections
      console.log(this.Secciones)
    });
  }

  nextView(seccionId) {
    const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
    if (carousel?.swiper) {
      carousel.swiper.slideNext(); // Mueve al siguiente slide
    }
  }

  prevView(seccionId) {
    const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
    if (carousel?.swiper) {
      carousel.swiper.slidePrev(); // Mueve al slide anterior
    }
  }

}
