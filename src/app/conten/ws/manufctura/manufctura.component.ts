import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { fadeInAnimation } from '../../../fadeIn';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LandingService } from '../../conten.service';
import _ from 'lodash';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { PetitionsService } from '../../../petitions.service';
import { MobileService } from '../../../mobile.service';
import { Category } from '../../models/category';
// register Swiper custom elements
register();

const MANUFACTURA_CATEGORY = 'manufactura';
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
  public categoria: Category;
  // categoria = {
  //   id: 1,
  //   name: 'Manufactura',
  //   url: 'manufactura',
  //   descripcion: '<p>En nuestra división de Manufactura, actualmente contamos con maquinaria especializada y perfectas instalaciones que nos permiten cortar, doblar, troquelar, soldar materiales de acero en gran volumen. </p>',
  //   contenido: [
  //     {id: 1, name: 'Máquina láser LC-5', img: 'assets/imagenes/manufactura/maquinas/maquina1.png'},
  //     {id: 2, name: 'Máquina láser LS-5', img: 'assets/imagenes/manufactura/maquinas/maquina2.png'},
  //     {id: 3, name: 'Máquina láser LS-7', img: 'assets/imagenes/manufactura/maquinas/maquina3.jpg'},
  //   ]
  // }

  //CARRUSELES EJEMPLO DE SUBSECCIONES//
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
        { id: 1, img: 'assets/imagenes/manufactura/LaserTubo/LaserTubo1.jpeg' }, //assets/imagenes/manufactura/subsecciones/corteLaser/1.jpg
        { id: 2, img: 'assets/imagenes/manufactura/LaserTubo/LaserTubo2.jpeg' },
        { id: 3, img: 'assets/imagenes/manufactura/LaserTubo/LaserTubo3.jpeg' }
      ],
      description: "Nuestras máquinas de corte láser para tubo nos permiten ofrecer cortes con una gran precisión, cortar geometrías complejas en tubos redondos, cuadrado, rectangular y ovales con tiempos de proceso muy rápidos, hasta 5” de diámetro. <br> • Podemos crear cualquier característica de corte o geometría en los tubos. <br> • Tubos redondos, cuadrado, rectangular y ovales. <br> • Agujeros, ranuras, chaflanes, filetes. <br> • Corte pliegue para posteriormente doblar un tubo. <br> • Diferentes tipos de materiales (acero al carbón, acero inoxidable, acero galvanizado, aluminio, cobre, latón). <br> • Fabricación de piezas que tienen diferentes procesos en una sola máquina. <br> • Mejor precisión. <br> • Mejor calidad de corte. <br> • Mejores tiempos de proceso."
    },
    {
      id: 2,
      name: 'Corte Laser Placa y Lamina',
      url: 'corte-laser-placa-y-lamina',
      seccion: 'Corte láser y plasma',
      imgs: [
        { id: 1, img: 'assets/imagenes/manufactura/LaserPlacaLamina/LaserPlacaLamina1.jpeg' },
        { id: 2, img: 'assets/imagenes/manufactura/LaserPlacaLamina/LaserPlacaLamina2.jpg' },
        { id: 3, img: 'assets/imagenes/manufactura/LaserPlacaLamina/LaserPlacaLamina3.jpg' },
        { id: 1, img: 'assets/imagenes/manufactura/LaserPlacaLamina/LaserPlacaLamina4.jpg' },
        { id: 2, img: 'assets/imagenes/manufactura/LaserPlacaLamina/LaserPlacaLamina5.jpeg' },
        { id: 3, img: 'assets/imagenes/manufactura/LaserPlacaLamina/LaserPlacaLamina6.jpeg' },
        { id: 1, img: 'assets/imagenes/manufactura/LaserPlacaLamina/LaserPlacaLamina7.png' },
        { id: 2, img: 'assets/imagenes/manufactura/LaserPlacaLamina/LaserPlacaLamina8.jpg' },
        { id: 3, img: 'assets/imagenes/manufactura/LaserPlacaLamina/LaserPlacaLamina9.jpg' },
        { id: 3, img: 'assets/imagenes/manufactura/LaserPlacaLamina/LaserPlacaLamina10.jpg' },
      ],
      description: "Nuestras máquinas de corte láser para lámina y placa nos permiten ofrecer cortes, con una gran precisión, cortar geometrías complejas en lámina y placa, aprovechando al máximo la materia prima con la propiedad de nesting de las piezas a cortar. <br>• Cortes con una gran precisión. <br>• Cortes geométricas complejas en lámina y placa. <br>• Cortes en diferentes tipos de materiales (acero al carbón, acero inoxidable, acero galvanizado, aluminio, latón, cobre). <br>• Hasta 5/8” de espesor en hojas hasta de 3.0m x 1.5m."
    },
    {
      //Faltan imagenes
      id: 3,
      name: 'Corte con Plasma',
      url: 'corte-laser-con-plasma',
      seccion: 'Corte con plasma',
      imgs: [
        // { id: 1, img: 'assets/imagenes/manufactura/CortePlaca/placa1.jpg' },
        // { id: 2, img: 'assets/imagenes/manufactura/CortePlaca/placa2.jpg' },
        // { id: 3, img: 'assets/imagenes/manufactura/CortePlaca/placa3.jpg' },
      ],
      description: "Contamos con sistema de corte pantógrafo plasma CNC, con una capacidad de corte en acero de hasta 1 ¼” en hojas de 4´x 10´, es ideal para el habilitado de piezas especiales y diseñadas por computadora, se cuenta con software de análisis para un mejor aprovechamiento de la metería prima. "
    },
    {
      id: 4,
      name: 'Troquelado',
      url: 'troquelado',
      seccion: 'Troquelado',
      imgs: [
        { id: 1, img: 'assets/imagenes/manufactura/Troquelado/Troquelado1.jpeg' },
        { id: 2, img: 'assets/imagenes/manufactura/Troquelado/Troquelado2.jpeg' },
        { id: 3, img: 'assets/imagenes/manufactura/Troquelado/Troquelado3.jpeg' },
        { id: 1, img: 'assets/imagenes/manufactura/Troquelado/Troquelado4.png' },
        { id: 2, img: 'assets/imagenes/manufactura/Troquelado/Troquelado5.png' },
        { id: 3, img: 'assets/imagenes/manufactura/Troquelado/Troquelado6.png' },
      ],
      description: "En Andamios Atlas queremos ser tu aliado en tus procesos de troquelado. <br>Contamos con prensas con capacidad de hasta 130 tons.  <br> <br>Aplicaciones del troquelado <br>• punzonado de varios orificios <br>• corte en dos o más piezas <br>• remoción de piezas o diversas formas <br>• troquelado diferentes espesores"
    },
    {
      //Faltan imagenes
      id: 5,
      name: 'Corte con sierra cinta',
      url: 'corte-con-sierra-cinta',
      seccion: 'Corte con sierra cinta',
      imgs: [
        // { id: 1, img: 'assets/imagenes/manufactura/CortePlaca/placa1.jpg' },
        // { id: 2, img: 'assets/imagenes/manufactura/CortePlaca/placa2.jpg' },
        // { id: 3, img: 'assets/imagenes/manufactura/CortePlaca/placa3.jpg' },
      ],
      description: "Nuestro proceso de corte por sierra cinta, es ideal para el corte de barras sólidas, barras huecas, perfiles estructurales en acero, aluminio, bronce y demás aleaciones, con una capacidad de sección de hasta 18” x 24” esta es la opción adecuada para el habilitado de altos volúmenes en corte recto."
    },
    {
      //Faltan imagenes
      id: 6,
      name: 'Corte de barras y tubería',
      url: 'corte-de-barras-y-tuberia',
      seccion: 'Corte de barras y tubería',
      imgs: [
        // { id: 1, img: 'assets/imagenes/manufactura/CortePlaca/placa1.jpg' },
        // { id: 2, img: 'assets/imagenes/manufactura/CortePlaca/placa2.jpg' },
        // { id: 3, img: 'assets/imagenes/manufactura/CortePlaca/placa3.jpg' },
      ],
      description: "Nos permite ofrecer cortes rectos y a grados de diferentes tipos de perfiles, redondo, rectangular, cuadrado en materiales como acero al carbón, aceros especiales, aluminio e incluso PVC."
    },
    {
      id: 7,
      name: 'Doblez de placa y lámina',
      url: 'doblez-de-placa-y-lamina',
      seccion: 'Doblez de placa y lámina',
      imgs: [
        { id: 1, img: 'assets/imagenes/manufactura/Doblez/Doblez1.jpeg' },
        { id: 2, img: 'assets/imagenes/manufactura/Doblez/Doblez2.jpeg' },
        { id: 3, img: 'assets/imagenes/manufactura/Doblez/Doblez3.jpeg' },
        { id: 3, img: 'assets/imagenes/manufactura/Doblez/Doblez4.jpeg' }
      ],
      description: ""
    },
    {
      id: 8,
      name: 'Robot de soldadura',
      url: 'robot-de-soldadura',
      seccion: 'Robot de soldadura',
      imgs: [
        { id: 1, img: 'assets/imagenes/manufactura/RobotSoldadura/RobotSoldadura1.jpg' },
        { id: 2, img: 'assets/imagenes/manufactura/RobotSoldadura/RobotSoldadura2.jpg' },
        { id: 3, img: 'assets/imagenes/manufactura/RobotSoldadura/RobotSoldadura3.jpg' },
        { id: 3, img: 'assets/imagenes/manufactura/RobotSoldadura/RobotSoldadura4.jpg' },
        { id: 3, img: 'assets/imagenes/manufactura/RobotSoldadura/RobotSoldadura5.png' },
        { id: 3, img: 'assets/imagenes/manufactura/RobotSoldadura/RobotSoldadura6.png' },
      ],
      description: "Producción simultánea de dos o más productos completamente diferenciados al contar con dos mesas de ensamble. Ideal para fabricar mobiliario hospitalario, estructuras metálicas, pequeños tanques de presión, aspersores, maquinaria agrícola, armarios eléctricos, entre otros."
    },
    {
      id: 9,
      name: 'Sistema de pintura en polvo',
      url: 'sistema-de-pintura-en-polvo',
      seccion: 'Sistema de pintura en polvo',
      imgs: [
        { id: 1, img: 'assets/imagenes/manufactura/PinturaPolvo/PinturaPolvo1.png' },
        { id: 2, img: 'assets/imagenes/manufactura/PinturaPolvo/PinturaPolvo2.png' },
        { id: 3, img: 'assets/imagenes/manufactura/PinturaPolvo/PinturaPolvo3.png' },
      ],
      description: "Contamos con un sistema de pintura en polvo, en el cual podemos pintar piezas con dimensiones de hasta: 2.4m de ancho x 4m de largo x 2m de altura. (electrostática, proceso de desengrasado, secado, aplicación y horneo) <br> VENTAJAS: <br>No contiene solventes. <br>100% de utilización de material. <br>Garantía en la adherencia de acuerdo con la norma ASTM."
    },
    {
      id: 10,
      name: 'Sistema de pintura líquida',
      url: 'sistema-de-pintura-liquida',
      seccion: 'Sistema de pintura líquida',
      imgs: [
        { id: 1, img: 'assets/imagenes/manufactura/PinturaLiquida/PinturaLiquida1.png' },
        { id: 2, img: 'assets/imagenes/manufactura/PinturaLiquida/PinturaLiquida2.png' }
      ],
      description: "En nuestro servicio de pintura por aspersión, contamos con proceso de desengrasado por medio de fosfatos, lavado y preparación de superficies, cabinas de pintura confinadas y horno para garantizar un acabado y adherencia uniforme. <br><br>Nuestra capacidad cubre desde piezas pequeñas hasta elementos de 62.00” frente x 55.00” altura x 110.00” fondo y un peso no mayor a 400kg."
    },
    {
      id: 11,
      name: 'Medición de racks por medio de scanner',
      url: 'medicion-de-racks-por-medio-de-scanner',
      seccion: 'Medición de racks por medio de scanner',
      imgs: [
        { id: 1, img: 'assets/imagenes/manufactura/Medicion/Medicion1.jpg' },
        { id: 2, img: 'assets/imagenes/manufactura/Medicion/Medicion2.png' },
        { id: 3, img: 'assets/imagenes/manufactura/Medicion/Medicion3.png' },
      ],
      description: "Nos permite hacer mediciones de las dimensiones críticas de los contenedores, para validar contra la ingeniería, de igual forma nos permite hacer ingeniera en reversa y/o la comparación del contenedor físico contra el modelo matemático (3D). También podemos ofrecer CMM (por sus siglas en inglés para Sistema DE Medición por Coordenadas).<br> <br>Aseguramos que las medidas críticas en los racks sean correctas conforme a plano por medio de nuestro Scanner de medición 3D indicados en la fabricación de racks para toma robótica."
    },
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
    private mobile: MobileService,
    private contenService: LandingService

  ) {
    this.route.paramMap.subscribe(params => {
      this.isSection = false;
      this.isSubSection = false;
      const title = params.get('name');
      const currentRoute = this.route.snapshot.url.map(segment => segment.path).join('/');

      if (currentRoute.includes(MANUFACTURA_SUBSECTION_ROUTE) && !_.isEmpty(title)) {
        this.contenService.obtenerSubSeccionManufact(title).subscribe((subseccionMain)=>{
          console.log("subseccionMain")
          console.log(subseccionMain)
          this.subseccionMain = subseccionMain[0]
        });
        this.isSubSection = true;
        this.isSection = false;
        this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.subseccionMain.description);
      } else if (currentRoute.includes(MANUFACTURA_SECTION_ROUTE) && !_.isEmpty(title)) {
        this.contenService.obtenerSeccionManufact(title).subscribe((seccionMain)=>{
          this.seccionMain = seccionMain
        });
        this.isSection = true;
        this.isSubSection = false;
      } else {
        this.contenService.obtenerCategoria(MANUFACTURA_CATEGORY).subscribe((categoria)=>{
          this.categoria = categoria
        });
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
