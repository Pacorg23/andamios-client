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
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './general.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './general.component.css',
  animations: [fadeInAnimation]
})
export class GeneralComponent {
  test_comp: number = 0
  comp: { id: number, titulo: string, tipo: number }
  //Datos de manufactura conten
  secciones = [
    {
      id: 1,
      name: 'Corte Laser para Tubo',
      tipo: 1,
      subSecciones: [
        { id: 1, name: 'Item 1', img: 'assets/imagenes/manufactura/CorteLaser/corte1.jpeg' },
        { id: 2, name: 'MEDICIÓN DE RACKS POR MEDIO DE SCANNER', img: 'assets/imagenes/manufactura/CorteLaser/corte2.jpeg' },
        { id: 3, name: 'Item 3', img: 'assets/imagenes/manufactura/CorteLaser/corte3.jpeg' },

      ]
    },
    {
      id: 2,
      name: 'Corte Laser Placa y Lamina',
      subSecciones: [
        { id: 1, name: 'MEDICIÓN DE RACKS POR MEDIO DE SCANNER', img: 'assets/imagenes/manufactura/CortePlaca/placa1.jpg' },
        { id: 2, name: 'Item 2', img: 'assets/imagenes/manufactura/CortePlaca/placa2.jpg' },
        { id: 3, name: 'Item 3', img: 'assets/imagenes/manufactura/CortePlaca/placa3.jpg' },
        { id: 4, name: 'Item 4', img: 'assets/imagenes/manufactura/CortePlaca/placa4.jpg' },
        { id: 5, name: 'MEDICIÓN DE RACKS POR MEDIO DE SCANNER', img: 'assets/imagenes/manufactura/CortePlaca/placa5.jpg' }
      ]
    },
    {
      id: 3,
      name: 'Robot de Soldadura',
      subSecciones: [
        { id: 1, name: 'Item 1', img: 'assets/imagenes/manufactura/RobotSoldadura/robot1.jpg' },
        { id: 2, name: 'Item 2', img: 'assets/imagenes/manufactura/RobotSoldadura/robot2.jpg' },
        { id: 3, name: 'MEDICIÓN DE RACKS POR MEDIO DE SCANNER', img: 'assets/imagenes/manufactura/RobotSoldadura/robot3.jpg' }
      ]
    }
  ];

  subSeccion = {
    id: 1,
    name: 'Corte Laser para Tubo',
    imgs: [
      { id: 1, img: 'assets/imagenes/manufactura/CorteLaser/corte1.jpeg' },
      { id: 2, img: 'assets/imagenes/manufactura/CorteLaser/corte2.jpeg' },
      { id: 3, img: 'assets/imagenes/manufactura/CorteLaser/corte3.jpeg' }
    ],
    description: "Nuestras máquinas de corte láser para tubo nos permiten ofrecer cortes con una gran precisión, cortar geometrías complejas en tubos redondos, cuadrado, rectangular y ovales con tiempos de proceso muy rápidos, hasta 5” de diámetro. <br> • Podemos crear cualquier característica de corte o geometría en los tubos. <br> • Tubos redondos, cuadrado, rectangular y ovales. <br> • Agujeros, ranuras, chaflanes, filetes. <br> • Corte pliegue para posteriormente doblar un tubo. <br> • Diferentes tipos de materiales (acero al carbón, acero inoxidable, acero galvanizado, aluminio, cobre, latón). <br> • Fabricación de piezas que tienen diferentes procesos en una sola máquina. <br> • Mejor precisión. <br> • Mejor calidad de corte. <br> • Mejores tiempos de proceso."
  }

  seccion = {
    id: 2,
    name: 'Corte Laser Placa y Lamina',
    subSecciones: [
      { id: 1, name: 'MEDICIÓN DE RACKS POR MEDIO DE SCANNER', img: 'assets/imagenes/manufactura/CortePlaca/placa1.jpg' },
      { id: 2, name: 'Item 2', img: 'assets/imagenes/manufactura/CortePlaca/placa2.jpg' },
      { id: 3, name: 'Item 3', img: 'assets/imagenes/manufactura/CortePlaca/placa3.jpg' },
      { id: 4, name: 'Item 4', img: 'assets/imagenes/manufactura/CortePlaca/placa4.jpg' },
      { id: 5, name: 'MEDICIÓN DE RACKS POR MEDIO DE SCANNER', img: 'assets/imagenes/manufactura/CortePlaca/placa5.jpg' }
    ]
  }

  //Datos ingenieria
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
    },
    {
      id: 2, description: this.sanitizer.bypassSecurityTrustHtml("descripcion"), imgs: [
        { id: 1, img: 'assets/imagenes/ingenieria/ing1.jpg' },
        { id: 2, img: 'assets/imagenes/ingenieria/ing2.jpg' },
        { id: 3, img: 'assets/imagenes/ingenieria/ing3.jpg' }
      ]
    },
    {
      id: 3, description: this.sanitizer.bypassSecurityTrustHtml("descripcion"), imgs: [
        { id: 1, img: 'assets/imagenes/ingenieria/ing1.jpg' },
        { id: 2, img: 'assets/imagenes/ingenieria/ing2.jpg' },
        { id: 3, img: 'assets/imagenes/ingenieria/ing3.jpg' }
      ]
    }
  ]
  //Datos productos
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
    switch (this.comp.tipo) {
      case 1:

        this.mobile.getWidth().subscribe(width => {
          this.isMobile = width < 768;
          this.isTablet = width >= 768 && width < 1279;

          if (this.isMobile) {
            this.slidesPer = 1;
            this.imgWidth = "60%";
            this.width = "100%";
            this.height = "auto";
            this.imgHeight = "200px";
          } else if (this.isTablet) {
            this.slidesPer = 2;
            this.imgWidth = "70%";
            this.width = "100%";
            this.height = "auto";
            this.imgHeight = "200px";
          } else {
            this.slidesPer = 3;
          }
        });
        break;
    }
  }

  goTo(seccion) {
    seccion = this.petitionsService.formatToDashes(seccion);
    if (_.isEmpty(seccion)) {
      this.router.navigate(['/conten/manufactura']);
    } else {
      this.router.navigate([`/conten/manufactura/subseccion/${seccion}`]);
    }
  }

  nextView(seccionId?) {
    switch (this.comp.tipo) {
      case 1: { //caso manufactura
        const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slideNext(); // Mueve al siguiente slide
        }
        break
      }
      case 2: {//caso ingenieria
        const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slideNext(); // Mueve al siguiente slide
        }
        break
      }
      case 4: {
        const carousel = document.querySelector(`#carousel`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slideNext(); // Mueve al siguiente slide
        }
      }
    }
  }
  prevView(seccionId ?) {
    switch (this.comp.tipo) {
      case 1: {//caso manufactura
        const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slidePrev(); // Mueve al slide anterior
        }
        break
      }
      case 2: {// caso ingenieria
        const carousel = document.querySelector(`#carousel-${seccionId}`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slidePrev(); // Mueve al slide anterior
        }
        break
      }
      case 4: {
        const carousel = document.querySelector(`#carousel`) as any; // Selecciona el carrusel por ID
        if (carousel?.swiper) {
          carousel.swiper.slidePrev(); // Mueve al slide anterior
        }
      }
    }
  }
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private petitionsService: PetitionsService,
    private mobile: MobileService,
    private route: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.comp = {
        id: 1,
        titulo: "titulo de prueba lol UwU pog asdfasdlkf",
        tipo: 2
      }

      this.comp.tipo = parseInt(params.get('opcion'))

      switch (this.comp.tipo) {
        case 1:
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
        case 2: {
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
        case 3: {
          this.items.forEach(item => {
            item.description = this.sanitizer.bypassSecurityTrustHtml(item.description);
          });
          break;
        }
        case 4: {
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
          this.cerificaciones.forEach(certificacion => {
            certificacion.description = this.sanitizer.bypassSecurityTrustHtml(certificacion.description);
          });
          break;
        }
      }

    })
  }
}
