import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileService } from '../../../mobile.service';
import { register } from 'swiper/element/bundle';
import { ContenService } from '../../conten.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
register();

@Component({
  selector: 'app-conten-navbar',
  standalone: true,
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './conten-navbar.component.html',
  styleUrl: './conten-navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContenNavbarComponent {

  mainUrl = '/conten/';
  icon: string = 'menu'

  navbar: any
  configCategories = [
    {
      name: 'NOSOTROS',
      hasSections: false,
      url: '/conten',
      isDefault: true,
      isActive: true
    },
    {
      name: 'MANUFACTURA',
      hasSections: true,
      url: '/conten/manufactura',
      isActive: true,
      sections: [
        {
          name: 'Corte láser y plasma',
          url: 'corte-laser-y-plasma'
        },
        {
          name: 'Corte convencional',
          url: 'corte-convencional'
        },
        {
          name: 'Soldadura',
          url: 'soldadura'
        },
        {
          name: 'Pintura',
          url: 'pintura'
        }
      ]
    },
    {
      name: 'DISEÑO E INGENIERÍA',
      hasSections: false,
      isActive: true,
      url: this.mainUrl + 'ingenieria'
    },
    {
      name: 'PRODUCTOS',
      hasSections: false,
      isActive: true,
      url: this.mainUrl + 'productos'
    },
    {
      name: 'NUESTRAS CERTIFICACIONES',
      hasSections: false,
      isActive: true,
      url: this.mainUrl + 'certificaciones'
    },
    {
      name: 'OPC1',
      hasSections: false,
      isActive: false,
      url: this.mainUrl + 'opc1'
    },
    {
      name: 'OPC2 NUESTRAS CERTIFICACIONES',
      hasSections: false,
      isActive: false,
      url: this.mainUrl + 'opc1'
    },
    {
      name: 'OPC2 NOMBRE LARGO',
      hasSections: false,
      isActive: false,
      url: this.mainUrl + 'opc1'
    }
  ];

  isMobile: boolean;
  isTablet: boolean;

  constructor(private mobile: MobileService, private accionesService: ContenService) { }

  ngOnInit() {
    this.mobileView();
    this.getNavbar();
  }

  /**
   * @description Determina si el dispositivo es móvil o tablet y ajusta las variables isMobile e isTablet.
   * @returns {void}
   */
  public mobileView(): void {
    this.mobile.getWidth().subscribe(width => {
      this.isMobile = width < 768;
      this.isTablet = width >= 768 && width < 1279;
    });
  }

  /**
   * @description Obtiene el menú de navegación desde el servicio y lo asigna a la variable navbar.
   * En caso de error, muestra un mensaje de alerta utilizando SweetAlert2.
   * @returns {void}
   */
  public getNavbar(): void {
    this.accionesService.obtenerNavbar().subscribe((data) => {
      this.navbar = data;
    }, (error) => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar el menú',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    });
  }

  toggleIcon() {
    if (this.icon == 'close') {
      this.icon = 'menu'
    } else if (this.icon == 'menu') {
      this.icon = 'close'
    }

    document.getElementById('responsive-menu').classList.toggle('openMenu')
  }
}
