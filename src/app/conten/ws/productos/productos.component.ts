import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HoverableComponent } from '../../html/hoverable/hoverable.component';
import { fadeInAnimation } from '../../../fadeIn';
import { DomSanitizer } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
register();

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [fadeInAnimation]
})
export class ProductosComponent {

  productos = [
    {
      id: 1,
      name: 'Rack Automotriz',
      imgs: [
        {id: 1, file:'assets/imagenes/productos/Rack.png'}, //TODO homologar file a img
        {id: 2, file:'assets/imagenes/productos/Rack0.jpg'},
        {id: 3, file:'assets/imagenes/productos/Rack1.jpg'},
        {id: 4, file:'assets/imagenes/productos/Rack2.jpg'},
        {id: 5, file:'assets/imagenes/productos/Rack3.jpg'},
        {id: 6, file:'assets/imagenes/productos/Rack4.jpg'},
        {id: 7, file:'assets/imagenes/productos/Rack5.jpg'},
        {id: 8, file:'assets/imagenes/productos/Rack6.jpg'},
        {id: 9, file:'assets/imagenes/productos/Rack7.jpg'}
      ]
    },
    {
      id: 2,
      name: 'Contenedores Metálicos',
      imgs: [
        {id: 1, file:'assets/imagenes/productos/CanastillaMetalica.png'},
        {id: 2, file:'assets/imagenes/productos/CanastillaMetalica0.jpg'},
        {id: 3, file:'assets/imagenes/productos/CanastillaMetalica1.jpg'},
        {id: 4, file:'assets/imagenes/productos/CanastillaMetalica2.jpg'},
        {id: 5, file:'assets/imagenes/productos/CanastillaMetalica3.jpg'},
        {id: 6, file:'assets/imagenes/productos/CanastillaMetalica4.jpg'}
      ]
    }
  ]

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

  constructor(private sanitizer: DomSanitizer) { }

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
