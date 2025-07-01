import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fadeInAnimation } from '../../../fadeIn';
import { DomSanitizer } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ContenService } from '../../conten.service';
import { Section } from '../../models/seccion';
import { LoadingContenComponent } from '../../html/loading-conten/loading-conten.component';
import Swal from 'sweetalert2';
import { Category } from '../../models/category';
register();

const CATEGORY_NAME = "productos";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, MatIconModule, LoadingContenComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [fadeInAnimation]
})
export class ProductosComponent {

  public categoria: Category;
  public secciones: Section[] = [];
  public loading: boolean;

  //CAROUSEL//
  slidesPer: number = 1;
  loop: boolean = true;
  speed: number = 1000;
  brakePoints: any = {
    640: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1,
    },
  };
  width: string = "100%";
  height: string = "auto";
  imgWidth: string = "100%";
  imgHeight: string = "500px";
  mainUrl: string = '/';
  destinyUrl: string = '/';
  autoplay: any = {
    delay: 3000,
    disableOnInteraction: true,
    pauseOnMouseEnter: true
  };

  constructor(private sanitizer: DomSanitizer,
    private contenService: ContenService
  ) {
    this.loading = true;
    this.getSections();
  }

  /**
   * @description Obtiene las secciones de productos desde el servicio de contenido.
   * @returns {void}
   */
  public getSections(): void {
    this.contenService.obtenerCategoria(CATEGORY_NAME).subscribe((categoria) => {
      this.categoria = categoria;
      this.secciones = categoria.sections;
      this.loading = false;
    }, (error) => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar las secciones de productos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.loading = false;
    });
  }

  /**
   * @description Funcion para mover al siguiente slide del carrusel dependiendo del ID de la seccion.
   * @param {number} seccionId - El ID de la seccion del carrusel.
   * @return {void}
   */
  public nextView(seccionId: number): void {
    const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
    if (carousel?.swiper) {
      carousel.swiper.slideNext(); // Mueve al siguiente slide
    }
  }

  /**
   * @description Funcion para mover al slide anterior del carrusel dependiendo del ID de la seccion.
   * @param {number} seccionId - El ID de la seccion del carrusel.
   * @return {void}
   */
  public prevView(seccionId: number): void {
    const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
    if (carousel?.swiper) {
      carousel.swiper.slidePrev(); // Mueve al slide anterior
    }
  }
}
