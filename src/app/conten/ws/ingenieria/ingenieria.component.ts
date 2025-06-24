import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../fadeIn';
import { DomSanitizer } from '@angular/platform-browser';
import _ from 'lodash';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ContenService } from '../../conten.service';
import { Section } from '../../models/seccion';
import { Category } from '../../models/category';
import Swal from 'sweetalert2';
import { LoadingContenComponent } from '../../html/loading-conten/loading-conten.component';
// register Swiper custom elements
register();

const CATEGORY_NAME = "diseno-e-ingenieria";

@Component({
  selector: 'app-ingenieria',
  standalone: true,
  imports: [CommonModule, MatIconModule, LoadingContenComponent],
  templateUrl: './ingenieria.component.html',
  styleUrl: './ingenieria.component.css',
  animations: [fadeInAnimation],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IngenieriaComponent implements OnInit {

  public categoria: Category;
  public secciones: Section[];
  public wip: boolean = false;

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
    private contenService: ContenService) { }

  ngOnInit() {
    this.wip = true;
    this.getItems();
  }

  /**
   * @description Obtiene la categoría de Ingeniería y sus secciones.
   * @param {void}
   * @returns {void}
   */
  public getItems(): void {
    this.contenService.obtenerCategoria(CATEGORY_NAME).subscribe((categoria) => {
      this.secciones = categoria.sections;
      this.categoria = categoria;
      this.wip = false;
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la sección de Ingeniería. Inténtalo más tarde.',
      });
      this.wip = false;
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
