import { afterRender, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SeoService } from '../../../seo.service';
import { LandingService } from '../../landing.service';
import { fadeInAnimation } from '../../../fadeIn';
import { title } from 'process';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css',
  animations: [fadeInAnimation]
})
export class ContactanosComponent {

  formulario: FormGroup;
  private archivo: File | undefined //variable de almacenamiento del archivo para el form
  private allowedType: string = "application/pdf"
  //control formulario
  nombre: boolean = false
  empresa: boolean = false
  telefono_fijo: boolean = false
  telefono_celular: boolean = false
  email: boolean = false
  localidad: boolean = false
  localidad_extranjera: boolean = false
  ubicacion: boolean = false
  informacion: boolean = false
  extranjero: boolean = false
  division: boolean = false

  localidad_value: string = '';
  localidad_extranjera_value: string = '';

  constructor(private fb: FormBuilder, private landingService: LandingService, private seo: SeoService) {

    this.seo.setTitle('Contactanos')
    this.seo.setKeywords(['Formulario', 'Contacto', 'Ayuda', 'Contactar andamios Atlas', ''
    ])

    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      empresa: ['', Validators.required],
      telefono_fijo: ['', [Validators.pattern('[0-9]{10}'), Validators.required, Validators.minLength(12)]],
      telefono_celular: ['', ],
      email: ['', [Validators.required, Validators.email]],
      localidad: ['', Validators.required],
      localidad_extranjera: ['', Validators.required],
      ubicacion: ['', Validators.required],
      informacion: ['', [Validators.required, Validators.maxLength(500)]],
      division: ['', Validators.required]
    })
  }
  toggleInput(event: any) {
    var localidad_extranjera_control = this.formulario.get('localidad_extranjera')
    if (+this.localidad_value == 0) {
      this.extranjero = true
      localidad_extranjera_control.setValidators([Validators.required]);
      
    }
    else {
      localidad_extranjera_control.clearValidators();
      this.extranjero = false
    }
    localidad_extranjera_control.updateValueAndValidity();
  }
  enviarFormulario() {
    
    console.log(this.formulario)
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nombre', this.formulario.get('nombre').value)
      formData.append('empresa', this.formulario.get('empresa').value)
      formData.append('fijo', this.formulario.get('telefono_fijo').value)
      formData.append('celular', this.formulario.get('telefono_celular').value)
      formData.append('correo', this.formulario.get('email').value)
      formData.append('estadoIN', this.formulario.get('localidad').value)
      formData.append('estadoOUT', this.formulario.get('localidad_extranjera').value)
      formData.append('area', this.formulario.get('ubicacion').value)
      formData.append('duda', this.formulario.get('informacion').value)
      formData.append('division', this.formulario.get('division').value)
      this.landingService.enviarContacto(formData).subscribe(res => {
        console.log(formData)
        //this.alerta = res
        this.formulario.reset();
        this.nombre = false
        this.empresa = false
        this.telefono_fijo = false
        this.telefono_celular = false
        this.email = false
        this.localidad = false
        this.localidad_extranjera = false
        this.ubicacion = false
        this.informacion = false
        this.extranjero = false
        this.division = false
        Swal.fire({
          toast: true,
          timerProgressBar: true,
          position: 'top-end',
          icon: 'success',
          iconColor: '#b30000',
          title: "Formulario Enviado",
          showConfirmButton: false,
          timer: 3000
        })
      }, (error) => {
        Swal.fire({
          icon: 'error',
          iconColor: '#b30000',
          title: "Error al enviar el formulario",
          text: error,
          showCancelButton: false,
          confirmButtonColor: '#b30000',
          confirmButtonText: "Ok"
        })
      })

    } else {
      if (this.formulario.get('nombre').invalid) {
        this.nombre = true
      }

      if (this.formulario.get('empresa').invalid) {
        this.empresa = true
      }

      if (this.formulario.get('division').invalid) {
        this.division = true
      }

      if (this.formulario.get('telefono_fijo').invalid) {
        this.telefono_fijo = true
      }

      if (this.formulario.get('telefono_celular').invalid) {
        this.telefono_celular = true
      }

      if (this.formulario.get('email').invalid) {
        this.email = true
      }

      if (this.formulario.get('localidad').invalid) {
        this.localidad = true
      }

      if (this.formulario.get('localidad_extranjera').invalid) {
        this.localidad_extranjera = true
      }

      if (this.formulario.get('ubicacion').invalid) {
        this.ubicacion = true
      }

      if (this.formulario.get('informacion').invalid) {
        this.informacion = true
      }
    }

  }


}
