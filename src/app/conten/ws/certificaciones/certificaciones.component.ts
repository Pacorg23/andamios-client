import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fadeInAnimation } from '../../../fadeIn';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LandingService } from '../../conten.service';
// register Swiper custom elements
register();

@Component({
  selector: 'app-certificaciones',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './certificaciones.component.html',
  styleUrl: './certificaciones.component.css',
  animations: [fadeInAnimation],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CertificacionesComponent {

  //TODO implement doc value to download pdf on image click
  cerificaciones: { id: number, description: any, img: string }[] = [
    {
      id: 1, description: `
Contamos con el Certificado otorgado por el Instituto Mexicano de Normalización y Certificación A.C.<br>
por implementar y mantener un sistema de Gestión de la Calidad de conformidad con<br>
NMX-CC-9001-IMNC-2015 ISO 9001:2015
`, img: 'assets/imagenes/certificaciones/certi1.png'
    },
    {
      id: 2, description: `
Contamos con el Certificado otorgado por el Instituto Mexicano de Normalización y Certificación A.C.<br>
por implementar y mantener un sistema de Gestión de la Calidad de conformidad con<br>
NMX-CC-9001-IMNC-2015 ISO 9001:2015
`, img: 'assets/imagenes/certificaciones/certi2.png'
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
  width: string = "100%";
  height: string = "auto";
  imgWidth: string = "100%";
  imgHeight: string = "300px";
  mainUrl: string = '/';
  destinyUrl: string = '/';
  autoplay: any = {
    delay: 3000,
    disableOnInteraction: true,
    pauseOnMouseEnter: true
  }

  constructor(private sanitizer: DomSanitizer,
    private contenService: LandingService
  ) {
    this.cerificaciones.forEach(certificacion => {
      certificacion.description = this.sanitizer.bypassSecurityTrustHtml(certificacion.description);
    });
    this.contenService.obtenerCategoria("nuestras-certificaciones").subscribe((categoria) => {
      this.Secciones= categoria.sections
      console.log(this.Secciones)
    });
  }

  nextView() {
    const carousel = document.querySelector(`#carousel`) as any; // Selecciona el carrusel por ID
    if (carousel?.swiper) {
      carousel.swiper.slideNext(); // Mueve al siguiente slide
    }
  }

  prevView() {
    const carousel = document.querySelector(`#carousel`) as any; // Selecciona el carrusel por ID
    if (carousel?.swiper) {
      carousel.swiper.slidePrev(); // Mueve al slide anterior
    }
  }

}
