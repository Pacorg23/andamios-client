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
// register Swiper custom elements
register();

const MANUFACTURA_SECTION_ROUTE = 'manufactura/seccion';
const MANUFACTURA_SUBSECTION_ROUTE = 'manufactura/subseccion';

@Component({
  selector: 'app-manufctura',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './manufctura.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './manufctura.component.css',
  animations: [fadeInAnimation]
})
export class ManufcturaComponent {

  //ITEMS//

  //CATEGORIA//
  categoria = {
    id: 1,
    name: 'Manufactura',
    url: 'manufactura',
    descripcion: '<p>En nuestra división de Manufactura, actualmente contamos con maquinaria especializada y perfectas instalaciones que nos permiten cortar, doblar, troquelar, soldar materiales de acero en gran volumen. </p>',
    contenido: [
      {id: 1, name: 'Máquina láser LC-5', img: 'assets/imagenes/manufactura/maquinas/maquina1.png'},
      {id: 2, name: 'Máquina láser LS-5', img: 'assets/imagenes/manufactura/maquinas/maquina2.png'},
      {id: 3, name: 'Máquina láser LS-7', img: 'assets/imagenes/manufactura/maquinas/maquina3.jpg'},
    ]
  }

  //CARRUSELES EJEMPLO DE SUBSECCIONES//
  secciones = [
    {
      id: 1,
      name: 'Corte láser y plasma',
      url: 'corte-laser-y-plasma',
      tipo: 1,
      subSecciones: [
        { id: 1, name: 'Corte láser para tubo', img: 'assets/imagenes/manufactura/CorteLaser/corte1.jpeg' },
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
        { id: 3, name: 'Conte con sierra cinta', img: 'assets/imagenes/manufactura/CorteConvencional/conve3.png' }
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

  //NO USAR EJEMPLO DE SECCION//
  seccion = {
    id: 2,
    name: 'Corte Laser Placa y Lamina',
    url: 'corte-laser-placa-y-lamina',
    subSecciones: [
      { id: 1, name: 'MEDICIÓN DE RACKS POR MEDIO DE SCANNER', img: 'assets/imagenes/manufactura/CortePlaca/placa1.jpg' },
      { id: 2, name: 'Item 2', img: 'assets/imagenes/manufactura/CortePlaca/placa2.jpg' },
      { id: 3, name: 'Item 3', img: 'assets/imagenes/manufactura/CortePlaca/placa3.jpg' },
      { id: 4, name: 'Item 4', img: 'assets/imagenes/manufactura/CortePlaca/placa4.jpg' },
      { id: 5, name: 'MEDICIÓN DE RACKS POR MEDIO DE SCANNER', img: 'assets/imagenes/manufactura/CortePlaca/placa5.jpg' }
    ]
  }

  //SUBSECCIONES EJEMPLO DE SUBSECCION//
  subSeccion = {
    id: 1,
    name: 'Corte Laser para Tubo',
    url: 'corte-laser-para-tubo',
    imgs: [
      { id: 1, img: 'assets/imagenes/manufactura/CorteLaser/corte1.jpeg' },
      { id: 2, img: 'assets/imagenes/manufactura/CorteLaser/corte2.jpeg' },
      { id: 3, img: 'assets/imagenes/manufactura/CorteLaser/corte3.jpeg' }
    ],
    description: "Nuestras máquinas de corte láser para tubo nos permiten ofrecer cortes con una gran precisión, cortar geometrías complejas en tubos redondos, cuadrado, rectangular y ovales con tiempos de proceso muy rápidos, hasta 5” de diámetro. <br> • Podemos crear cualquier característica de corte o geometría en los tubos. <br> • Tubos redondos, cuadrado, rectangular y ovales. <br> • Agujeros, ranuras, chaflanes, filetes. <br> • Corte pliegue para posteriormente doblar un tubo. <br> • Diferentes tipos de materiales (acero al carbón, acero inoxidable, acero galvanizado, aluminio, cobre, latón). <br> • Fabricación de piezas que tienen diferentes procesos en una sola máquina. <br> • Mejor precisión. <br> • Mejor calidad de corte. <br> • Mejores tiempos de proceso."
  };

  //TODO Aqui deben de ir los datos de las subsecciones, sonn 3 por seccion, usa la descripcion del word
  //TODO estructura de las img en assets -> assets/imagenes/manufactura/subsecciones/nombre/numero.jpg
  //TODO Digamos que esta es la tabla de subsecciones, y tu vas a buscar por el nombre de la subseccion
  subseccionesTEMP = [
    {
      id: 1,
      name: 'Corte Laser para Tubo',
      url: 'corte-laser-para-tubo',
      seccion: 'Corte láser y plasma',
      imgs: [
        { id: 1, img: 'assets/imagenes/manufactura/CorteLaser/corte1.jpeg' }, //assets/imagenes/manufactura/subsecciones/corteLaser/1.jpg
        { id: 2, img: 'assets/imagenes/manufactura/CorteLaser/corte2.jpeg' },
        { id: 3, img: 'assets/imagenes/manufactura/CorteLaser/corte3.jpeg' }
      ],
      description: "Nuestras máquinas de corte láser para tubo nos permiten ofrecer cortes con una gran precisión, cortar geometrías complejas en tubos redondos, cuadrado, rectangular y ovales con tiempos de proceso muy rápidos, hasta 5” de diámetro. <br> • Podemos crear cualquier característica de corte o geometría en los tubos. <br> • Tubos redondos, cuadrado, rectangular y ovales. <br> • Agujeros, ranuras, chaflanes, filetes. <br> • Corte pliegue para posteriormente doblar un tubo. <br> • Diferentes tipos de materiales (acero al carbón, acero inoxidable, acero galvanizado, aluminio, cobre, latón). <br> • Fabricación de piezas que tienen diferentes procesos en una sola máquina. <br> • Mejor precisión. <br> • Mejor calidad de corte. <br> • Mejores tiempos de proceso."
    },
    {
      id: 2,
      name: 'Corte Laser Placa y Lamina',
      url: 'corte-laser-placa-y-lamina',
      seccion: 'Corte láser y plasma',
      imgs: [
        { id: 1, img: 'assets/imagenes/manufactura/CortePlaca/placa1.jpg' },
        { id: 2, img: 'assets/imagenes/manufactura/CortePlaca/placa2.jpg' },
        { id: 3, img: 'assets/imagenes/manufactura/CortePlaca/placa3.jpg' },
      ],
      description: "Nuestras máquinas de corte láser para placa y lámina nos permiten"
    }
  ]

  seccionMain;
  subseccionMain;


  subSeccionUrl: string;
  isSubSection: boolean = false;
  isSection: boolean = false;
  safeDescription;

  //CAROUSEL//
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

  constructor(private router: Router, private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private petitionsService: PetitionsService,
    private mobile: MobileService
  ) {
    this.route.paramMap.subscribe(params => {
      this.isSection = false;
      this.isSubSection = false;
      const title = params.get('name');
      const currentRoute = this.route.snapshot.url.map(segment => segment.path).join('/');

      if (currentRoute.includes(MANUFACTURA_SUBSECTION_ROUTE) && !_.isEmpty(title)) {
        this.subseccionMain = this.subseccionesTEMP.find(sub => sub.url === title);
        this.isSubSection = true;
        this.isSection = false;
        this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.subSeccion.description);
      } else if (currentRoute.includes(MANUFACTURA_SECTION_ROUTE) && !_.isEmpty(title)) {
        this.seccionMain = this.secciones.find(seccion => seccion.url === title);
        this.isSection = true;
        this.isSubSection = false;
      } else {
        this.isSubSection = false;
        this.isSection = false;
      }
    });
  }

  ngOnInit() {
    this.mobile.getWidth().subscribe(width => {
      this.isMobile = width < 768;
      this.isTablet = width >= 768 && width < 1279;

      if(this.isMobile) {
        this.slidesPer = 1;
        this.imgWidth = "60%";
        this.width = "100%";
        this.height = "auto";
        this.imgHeight = "200px";
      } else if(this.isTablet) {
        this.slidesPer = 2;
        this.imgWidth = "70%";
        this.width = "100%";
        this.height = "auto";
        this.imgHeight = "200px";
      } else {
        this.slidesPer = 3;
      }
    });
  }

  goTo(seccion) {
    seccion = this.petitionsService.formatToDashes(seccion);
    if (_.isEmpty(seccion)) {
      this.router.navigate(['/conten/manufactura']);
    } else {
      this.router.navigate([`/conten/manufactura/subseccion/${seccion}`]);
    }
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
