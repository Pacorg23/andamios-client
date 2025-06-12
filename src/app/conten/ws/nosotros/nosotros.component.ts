import { Component } from '@angular/core';
import { fadeAnimation, fadeInAnimation } from '../../../fadeIn';
import { MobileService } from '../../../mobile.service';
import { ContenService } from '../../conten.service';
import { Carrusel } from '../../models/carrusel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoadingContenComponent } from '../../html/loading-conten/loading-conten.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import _ from 'lodash';
import { Sucursal } from '../../../andamios/models/sucursal';
import { NgOptimizedImage } from '@angular/common';

interface CarrouselSafe {
  file: SafeUrl;
  fileResponsive: SafeUrl;
  title: string;
  needsAction: boolean;
  action: string;
}
interface PlantasSafe {
  imgSafe: SafeUrl;
  size: string;
  location: string;
}

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [LoadingContenComponent, NgOptimizedImage],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css',
  animations: [fadeAnimation, fadeInAnimation]
})
export class NosotrosComponent {

  public isMobile: boolean;
  public isTablet: boolean;
  public loading: boolean;
  public slides: Carrusel[] = [];
  public safeSlides: CarrouselSafe[] = [];
  public plantas: Sucursal[] = [];
  public plantasSafe: PlantasSafe[] = [];

  constructor(private mobile: MobileService, private contenService: ContenService, private route: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.mobileView();
    this.getCarrusel();
    this.getPlantas();
    this.extraTime();
  }

  /**
   * @description Detecta el ancho de la pantalla para determinar si es móvil o tablet.
   * @param {void}
   */
  private mobileView(): void {
    this.loading = true;
    this.mobile.getWidth().subscribe(width => {
      this.isMobile = width < 768;
      this.isTablet = width >= 768 && width < 1279;
      this.loading = false;
    });
  }

  /**
   * @description Obtiene el carrusel de la API y lo asigna a la variable slides.
   * @param {void}
   */
  public getCarrusel(): void {
    this.loading = true;
    this.contenService.obtenerCarrusel().subscribe((carrusel: Carrusel[]) => {
      this.slides = carrusel;
      this.safeSlides = this.slides.map(slide => ({
        file: this.domSanitizer.bypassSecurityTrustUrl(slide.file),
        fileResponsive: this.domSanitizer.bypassSecurityTrustUrl(slide.fileResponsive),
        title: slide.filename,
        needsAction: slide.needsAction,
        action: slide.action
      }));
      this.loading = false;
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar el carrusel.',
        confirmButtonText: 'Aceptar'
      });
      this.loading = false;
    });
  }

  private extraTime(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }

  public getPlantas(): void {
    this.loading = true;
    this.contenService.obtenerPlantas().subscribe((plantas: Sucursal[]) => {
      this.plantas = plantas;
      this.plantasSafe = this.plantas.map(planta => ({
        imgSafe: this.domSanitizer.bypassSecurityTrustUrl(planta.imagen),
        size: planta.descripcion,
        location: planta.nombre
      }));
      this.loading = false;
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar las plantas.',
        confirmButtonText: 'Aceptar'
      });
      this.loading = false;
    });
  }

  /**
   * @description Desplaza suavemente la vista hacia el elemento con el ID especificado.
   * @param {string} elementId - El ID del elemento al que se desea desplazar.
   * @return {void}
   */
  public scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * @description Navega a la ruta especificada.
   * @param {string} link - La ruta a la que se desea navegar.
   * @return {void}
   */
  public goToLink(link: string): void {
    this.route.navigate([link]);
  }
}
