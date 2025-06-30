import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../fadeIn';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ContenService } from '../../conten.service';
import { Section } from '../../models/seccion';
import { Category } from '../../models/category';
import { PetitionsService } from '../../../petitions.service';
import { LoadingContenComponent } from '../../html/loading-conten/loading-conten.component';
import Swal from 'sweetalert2';
// register Swiper custom elements
register();

const CATEGORY_NAME = "nuestras-certificaciones";

@Component({
  selector: 'app-certificaciones',
  standalone: true,
  imports: [CommonModule, MatIconModule, LoadingContenComponent],
  templateUrl: './certificaciones.component.html',
  styleUrl: './certificaciones.component.css',
  animations: [fadeInAnimation],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CertificacionesComponent implements OnInit {

  //TODO implement doc value to download pdf on image click
  public categoria: Category;
  public certificaciones: Section[] = [];
  public wip: boolean;

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
    private contenService: ContenService,
    private petitionService: PetitionsService
  ) { }

  public ngOnInit(): void {
    this.wip = true;
    this.getCertificaciones();
  }

  /**
   * @description Obtiene las certificaciones de la categoria "nuestras-certificaciones"
   * @returns {void}
   */
  public getCertificaciones(): void {
    this.contenService.obtenerCategoria(CATEGORY_NAME).subscribe((categoria) => {
      this.categoria = categoria;
      this.certificaciones = categoria.sections;
      this.wip = false;
    }, (error) => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar las certificaciones. Inténtalo más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.wip = false;
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

  /**
   * @description Prepara la descarga de un archivo
   * @param {string} fileString - Cadena de texto que representa el archivo en
   * @param {string} fileName - Nombre del archivo a descargar
   * @returns {void}
   */
  public toDownload(fileString: string, fileName: string): void {
    this.petitionService.readyToDownload(fileString, fileName);
  }
}
