import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileService } from '../../../mobile.service';
import { register } from 'swiper/element/bundle';
import { LandingService } from '../../conten.service';
import { CommonModule } from '@angular/common';
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
  icon:string = 'menu'
  
  navbar:any
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

  constructor(private mobile: MobileService, private accionesService: LandingService) {
    
    this.accionesService.obtenerNavbar().subscribe((data) => {
      this.navbar = data;
      console.log(this.navbar)
    })
  }

  ngOnInit() {
    this.mobile.getWidth().subscribe(width => {
      this.isMobile = width < 768;
      this.isTablet = width >= 768 && width < 1279;
    });
    this.accionesService.obtenerNavbar().subscribe((data) => {
      this.navbar = data;
    })
  }

  toggleIcon(){
    if (this.icon == 'close') {
      this.icon = 'menu'
    } else if (this.icon == 'menu') {
      this.icon = 'close'
    }

    document.getElementById('responsive-menu').classList.toggle('openMenu')
  }
}
