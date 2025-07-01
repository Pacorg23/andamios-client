import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { fadeInAnimation } from '../../../fadeIn';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import _ from 'lodash';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { PetitionsService } from '../../../petitions.service';
import { MobileService } from '../../../mobile.service';
import { ContenService } from '../../conten.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { Category } from '../../models/category';
import { ThisReceiver } from '@angular/compiler';
import { Section } from '../../models/seccion';
// register Swiper custom elements
register();
export class Categoria {
  id: number
  title: number
  descrip: boolean
  btnText: string
  url: string
}

const GENERAL_CATEGORY = 'general';
const GENERAL_SECTION_ROUTE = 'general/seccion';
const GENERAL_SUBSECTION_ROUTE = 'general/subseccion';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './general.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './general.component.css',
  animations: [fadeInAnimation]
})
export class GeneralComponent {
  categoria: Category; // public categoria: Category;
  seccion: Section;
  subseccion: Section;
  comp: { url: string, titulo: string, tipo: string }
  //Datos de manufactura conten
  secciones = [
    {
      id: 1,
      name: 'Corte láser y plasma', //TODO CAMBIAR name por title en todo el componente
      url: 'corte-laser-y-plasma',
      subSecciones: [
        { id: 1, name: 'Corte láser para tubo', img: 'assets/imagenes/manufactura/CorteLaser/corte1.jpeg' }, //TODO CAMBIAR name por title en todo el componente
        { id: 2, name: 'Corte láser placa y lámina', img: 'assets/imagenes/manufactura/CorteLaser/corte2.jpeg' },
        { id: 3, name: 'Corte láser con plasma', img: 'assets/imagenes/manufactura/CorteLaser/corte3.png' },
      ]
    },
    {
      id: 2,
      name: 'Corte convencional',
      url: 'corte-convencional',
      subSecciones: [
        { id: 1, name: 'Corte con cizalla', img: 'assets/imagenes/manufactura/CorteConvencional/conve1.jpg' },
        { id: 2, name: 'Troquelado', img: 'assets/imagenes/manufactura/CorteConvencional/conve2.png' },
        { id: 3, name: 'Corte con sierra cinta', img: 'assets/imagenes/manufactura/CorteConvencional/conve3.png' }
      ]
    },
    {
      id: 3,
      name: 'Soldadura',
      url: 'soldadura',
      subSecciones: [
        { id: 1, name: 'Corte de barras y tubería', img: 'assets/imagenes/manufactura/Soldadura/robot1.png' },
        { id: 2, name: 'Doblez de placa y lámina', img: 'assets/imagenes/manufactura/Soldadura/robot2.jpg' },
        { id: 3, name: 'Robot de soldadura', img: 'assets/imagenes/manufactura/Soldadura/robot3.png' }
      ]
    },
    {
      id: 4,
      name: 'Pintura',
      url: 'pintura',
      subSecciones: [
        { id: 1, name: 'Sistema de pintura en polvo', img: 'assets/imagenes/manufactura/Pintura/pintura1.jpg' },
        { id: 2, name: 'Sistema de pintura líquida', img: 'assets/imagenes/manufactura/Pintura/pintura2.jpg' },
        { id: 3, name: 'Medición de racks por medio de scanner', img: 'assets/imagenes/manufactura/Pintura/pintura3.jpg' }
      ]
    }
  ];

  // subSeccion = {
  //   id: 1,
  //   name: 'Corte Laser para Tubo',
  //   imgs: [
  //     { id: 1, img: 'assets/imagenes/manufactura/CorteLaser/corte1.jpeg' },
  //     { id: 2, img: 'assets/imagenes/manufactura/CorteLaser/corte2.jpeg' },
  //     { id: 3, img: 'assets/imagenes/manufactura/CorteLaser/corte3.jpeg' }
  //   ],
  //   description: "Nuestras máquinas de corte láser para tubo nos permiten ofrecer cortes con una gran precisión, cortar geometrías complejas en tubos redondos, cuadrado, rectangular y ovales con tiempos de proceso muy rápidos, hasta 5” de diámetro. <br> • Podemos crear cualquier característica de corte o geometría en los tubos. <br> • Tubos redondos, cuadrado, rectangular y ovales. <br> • Agujeros, ranuras, chaflanes, filetes. <br> • Corte pliegue para posteriormente doblar un tubo. <br> • Diferentes tipos de materiales (acero al carbón, acero inoxidable, acero galvanizado, aluminio, cobre, latón). <br> • Fabricación de piezas que tienen diferentes procesos en una sola máquina. <br> • Mejor precisión. <br> • Mejor calidad de corte. <br> • Mejores tiempos de proceso."
  // }

  // seccion = {
  //   id: 2,
  //   name: 'Corte Laser Placa y Lamina',
  //   subSecciones: [
  //     { id: 1, name: 'MEDICIÓN DE RACKS POR MEDIO DE SCANNER', img: 'assets/imagenes/manufactura/CortePlaca/placa1.jpg' },
  //     { id: 2, name: 'Item 2', img: 'assets/imagenes/manufactura/CortePlaca/placa2.jpg' },
  //     { id: 3, name: 'Item 3', img: 'assets/imagenes/manufactura/CortePlaca/placa3.jpg' },
  //     { id: 4, name: 'Item 4', img: 'assets/imagenes/manufactura/CortePlaca/placa4.jpg' },
  //     { id: 5, name: 'MEDICIÓN DE RACKS POR MEDIO DE SCANNER', img: 'assets/imagenes/manufactura/CortePlaca/placa5.jpg' }
  //   ]
  // }

  //Datons certofocaciones
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
  //ITEMS//

  isSubSection: boolean = false;
  isSection: boolean = false;
  safeDescription;
  slidesPer: number = 3;
  loop: boolean = true;
  speed: number = 1000;
  brakePoints: any = {
    640: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
  };
  width: string = "100%";
  height: string = "auto";
  imgWidth: string = "90%";
  imgHeight: string = "300px";
  mainUrl: string = '/';
  destinyUrl: string = '/';
  autoplay: any = {
    delay: 3000,
    disableOnInteraction: true,
    pauseOnMouseEnter: true
  }
  isMobile: boolean;
  isTablet: boolean;
  // //CAROUSEL//
  ngOnInit() {
  }

  goTo(seccion) {
    seccion = this.petitionsService.formatToDashes(seccion);
    if (_.isEmpty(seccion)) {
      this.router.navigate(['/conten/general']);
    } else {
      this.router.navigate([`/conten/general/subseccion/${seccion}`]);
    }
  }

  nextView(seccionId?) {
    switch (this.comp.tipo) {
      case 'B': { //caso manufactura
        const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slideNext(); // Mueve al siguiente slide
        }
        break
      }
      case 'A': {//caso ingenieria
        const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slideNext(); // Mueve al siguiente slide
        }
        break
      }
      case 'D': {
        const carousel = document.querySelector(`#carousel`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slideNext(); // Mueve al siguiente slide
        }
        break
      }
      case 'C': {
        const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slideNext(); // Mueve al siguiente slide
        }
        break
      }
    }
  }
  prevView(seccionId?) {
    switch (this.categoria.tipo) {
      case "A": {//caso manufactura
        const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slidePrev(); // Mueve al slide anterior
        }
        break
      }
      case "B": {// caso ingenieria
        const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slidePrev(); // Mueve al slide anterior
        }
        break
      }
      case "D": {
        const carousel = document.querySelector(`#carousel`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slidePrev(); // Mueve al slide anterior
        }
        break
      }
      case "C": {
        const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slidePrev(); // Mueve al slide anterior
        }
        break
      }
    }
  }
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private petitionsService: PetitionsService,
    private mobile: MobileService,
    private route: ActivatedRoute,
    private landingService: ContenService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      // Inicializa datos de componente con valores predeterminados
      this.comp = {
        url: '1',
        titulo: "Init title",
        tipo: ''
      }

      const currentRoute = this.route.snapshot.url.map(segment => segment.path).join('/');
      const currentRouteSplit = currentRoute.split('/');
      const title = currentRoute.split('/')[currentRouteSplit.length-1];
      if (currentRoute.includes(GENERAL_SUBSECTION_ROUTE) && !_.isEmpty(title)) {
        this.landingService.obtenerSubSeccionConten(title).subscribe((subseccionMain) => {

          this.subseccion = subseccionMain[0]
          this.comp.tipo = 'B'
          this.categoria = {title : "",
            tipo : 'B',
            description: "",
            imgs: []

          }
          this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.subseccion.description);
        });
        this.isSubSection = true;
        this.isSection = false;
      } else if (currentRoute.includes(GENERAL_SECTION_ROUTE) && !_.isEmpty(title)) {
        this.landingService.obtenerSeccionConten(title).subscribe((seccionMain) => {
          this.seccion = seccionMain[0]
          this.comp.tipo = 'B'
          this.categoria = {title : "",
            tipo : 'B',
            description: "",
            imgs: []

          }
        });
        this.isSection = true;
        this.isSubSection = false;
      } else {
        console.log('GeneralComponent constructor');
        this.landingService.obtenerCategoria(title).subscribe((categoria) => {
          this.categoria = categoria
          this.comp.tipo = categoria.tipo
        });
        this.isSubSection = false;
        this.isSection = false;

        switch (this.comp.tipo) {
          case 'B':
            this.isSubSection = false;
            this.isSection = false;
            this.safeDescription;
            this.slidesPer = 3;
            this.loop = true;
            this.speed = 1000;
            this.brakePoints = {
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 2,
              },
            };
            this.width = "100%";
            this.height = "auto";
            this.imgWidth = "90%";
            this.imgHeight = "300px";
            this.mainUrl = '/';
            this.destinyUrl = '/';
            this.autoplay = {
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            }


            break;
          case 'A': {
            this.slidesPer = 1;
            this.loop = true;
            this.speed = 1000;
            this.brakePoints = {
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            };
            this.width = "80%";
            this.height = "auto";
            this.imgWidth = "80%";
            this.imgHeight = "300px";
            this.mainUrl = '/';
            this.destinyUrl = '/';
            this.autoplay = {
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            }
            break;
          }
          case 'C': {
            this.slidesPer = 1;
            this.loop = true;
            this.speed = 1000;
            this.brakePoints = {
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 1,
              },
            };
            this.width = "100%";
            this.height = "auto";
            this.imgWidth = "100%";
            this.imgHeight = "500px";
            this.mainUrl = '/';
            this.destinyUrl = '/';
            this.autoplay = {
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            };
            this.categoria.sections.forEach(item => {
              item.description = this.sanitizer.bypassSecurityTrustHtml(item.description);
            });
            break;
          }
          case 'D': {
            this.slidesPer = 1;
            this.loop = true;
            this.speed = 1000;
            this.brakePoints = {
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            };
            this.width = "100%";
            this.height = "auto";
            this.imgWidth = "100%";
            this.imgHeight = "300px";
            this.mainUrl = '/';
            this.destinyUrl = '/';
            this.autoplay = {
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            }

            break;
          }
        }
      }
    });

  }
}
