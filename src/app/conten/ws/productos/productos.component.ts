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

  items: Array<{
    id: number,
    title: string,
    description: any,
    img: string,
    url: string
  }> = [
    {
      id: 1,
      title: 'Rack Automotriz',
      description: 'Fabricados en Acero Estructural <br><br> Nuestros Racks permiten tener diferentes configuraciones que permiten un cuidado seguro de las autopartes y materiales durante su traslado y almacenamiento, como lo son los Racks Automotrices para carga y descarga robótica.<br><br>Nuestra obsesión por la excelencia se refleja en la elección de los materiales de primera calidad que utilizamos para fabricar cada rack.<br><br>Gracias a nuestro personal capacitado y nuestra maquinaria de vanguardia, logramos cálculos precisos para el trabajo eficaz del rack en la línea de producción y ensamble. Mediante procesos automatizados logramos fabricar en serie cualquier volumen de racks.',
      img: 'assets/imagenes/productos/r1.jpg',
      url: '/productos/rack-automotriz'
    },
    {
      id: 2,
      title: 'Racks de Toma Robótica',
      description: 'Fabricados en Acero Estructural <br><br> Nuestros Racks permiten tener diferentes configuraciones que permiten un cuidado seguro de las autopartes y materiales durante su traslado y almacenamiento, como lo son los Racks Automotrices para carga y descarga robótica.<br><br>Nuestra obsesión por la excelencia se refleja en la elección de los materiales de primera calidad que utilizamos para fabricar cada rack.<br><br>Gracias a nuestro personal capacitado y nuestra maquinaria de vanguardia, logramos cálculos precisos para el trabajo eficaz del rack en la línea de producción y ensamble. Mediante procesos automatizados logramos fabricar en serie cualquier volumen de racks.',
      img: 'assets/imagenes/productos/r2.jpg',
      url: '/productos/racks-de-toma-robotica'
    },
    {
      id: 3,
      title: 'Racks de Ensamble',
      description: 'Fabricados en Acero Estructural <br><br> Nuestros Racks permiten tener diferentes configuraciones que permiten un cuidado seguro de las autopartes y materiales durante su traslado y almacenamiento, como lo son los Racks Automotrices para carga y descarga robótica.<br><br>Nuestra obsesión por la excelencia se refleja en la elección de los materiales de primera calidad que utilizamos para fabricar cada rack.<br><br>Gracias a nuestro personal capacitado y nuestra maquinaria de vanguardia, logramos cálculos precisos para el trabajo eficaz del rack en la línea de producción y ensamble. Mediante procesos automatizados logramos fabricar en serie cualquier volumen de racks.',
      img: 'assets/imagenes/productos/r3.jpg',
      url: '/productos/racks-de-ensamble'
    }
  ]

  productos = [
    {
      id: 1,
      name: 'Rack Automotriz',
      imgs: [
        {id: 1, file:'assets/imagenes/productos/Rack.png'},
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

  constructor(private sanitizer: DomSanitizer) {
    this.items.forEach(item => {
      item.description = this.sanitizer.bypassSecurityTrustHtml(item.description);
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
