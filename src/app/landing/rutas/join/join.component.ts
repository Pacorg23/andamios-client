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
  templateUrl: './join.component.html',
  styleUrl: './join.component.css',
  animations:[fadeInAnimation]
})
export class JoinComponent {

  formulario: FormGroup;
  private archivo: File | undefined //variable de almacenamiento del archivo para el form
  private allowedType: string = "application/pdf"
  //control formulario
  nombre:boolean = false
  escolaridad:boolean = false
  area:boolean = false
  email:boolean = false
  telefono:boolean = false
  cv:boolean = false
  division:boolean = false

  constructor(private fb:FormBuilder, private landingService: LandingService, private seo:SeoService) {

    this.seo.setTitle('Unete al equipo')
    this.seo.setKeywords([
      'Unete al equipo',
      'Andamios Atlas pone a tu disposicion el formulario para crear una solicitud para unirse nuestro equipo de trabajo',
      'Unete a la familia de Andamios Atlas'
    ])

    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      escolaridad: ['', Validators.required],
      area: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      cv: ['', Validators.required],
      division: ['', Validators.required]
    })
  }

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  enviarFormulario() {

    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nombre', this.formulario.get('nombre').value)
      formData.append('escolaridad', this.formulario.get('escolaridad').value)
      formData.append('area', this.formulario.get('area').value)
      formData.append('email', this.formulario.get('email').value)
      formData.append('telefono', this.formulario.get('telefono').value)
      formData.append('cv', this.archivo, this.archivo.name)
      formData.append('division', this.formulario.get('division').value)

      if (this.archivo.type === this.allowedType) { //Solo si es pdf lo deja pasar
        this.landingService.enviarFormulario(formData).subscribe(res => {
          //this.alerta = res
          this.formulario.reset();
          this.nombre = false
          this.escolaridad = false
          this.area = false
          this.email = false
          this.telefono = false
          this.cv = false
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
      }else{
        Swal.fire({
          icon: 'error',
          iconColor: '#b30000',
          title: "Solo acepto PDFs",
          text: "Muy listo pero solo acepta pdf :c",
          showCancelButton: false,
          confirmButtonColor: '#b30000',
          confirmButtonText: "Ok"
        })
      }

    } else {
      if(this.formulario.get('nombre').invalid){
        this.nombre = true
      }

      if(this.formulario.get('escolaridad').invalid){
        this.escolaridad = true
      }

      if(this.formulario.get('area').invalid){
        this.area = true
      }

      if(this.formulario.get('email').invalid){
        this.email = true
      }

      if(this.formulario.get('telefono').invalid){
        this.telefono = true
      }

      if(this.formulario.get('cv').invalid){
        this.cv = true
      }

      if(this.formulario.get('division').invalid){
        this.division = true
      }
    }

  }


}
