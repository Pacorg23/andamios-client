import { afterRender, Component } from '@angular/core';
import { AndamiosService } from '../../andamios.service';
import { ActivatedRoute } from '@angular/router';
import { Seccion } from '../../models/seccion';
import { fadeInAnimation } from '../../../fadeIn';
import { Categoria } from '../../models/categoria';
import { MatIcon } from '@angular/material/icon';
import { PetitionsService } from '../../../petitions.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import { SeoService } from '../../../seo.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [MatIcon, CommonModule, SpinnerComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
  animations: [fadeInAnimation]
})
export class CategoriasComponent {

  //revisar la categoria y obtener su tipo
  categoria:Categoria
  secciones:Seccion[] = []
  popSeccion:Seccion
  loading:boolean = false
  showPop:boolean = false

  constructor(private andmiosService: AndamiosService, private route: ActivatedRoute,
    private petitionService:PetitionsService, private seo:SeoService
  ) {
    this.loading = true

    afterRender(()=>{
      window.scrollTo(0,0)
    })

    this.route.params.subscribe(params => {

      this.secciones = []

      this.andmiosService.obtenerTipoCategoria(params['url']).subscribe((data:Categoria) => {
        this.categoria = data
        this.seo.setTitle(this.categoria.nombre)
        const elemento = {
          tipo: this.categoria.tipo,
          id: this.categoria.id
        }

        this.andmiosService.obtenerSecciones(elemento).subscribe((data:Seccion[]) => {
          console.log(data)

          data.forEach((seccion:Seccion, index) => {

            this.seo.setKeywords([ this.categoria.nombre])

            if(seccion.imagen_inicio){
              seccion.imagen_inicio = this.petitionService.sanitizar(seccion.imagen_inicio)

              seccion.imagenes?.forEach((imagen:any) => {
                imagen.file = this.petitionService.sanitizar(imagen.file)
              })

              /*seccion.archivos?.forEach((archivo:any) => {
                archivo.file = this.petitionService.sanitizarPDF_main(archivo.file)
              })*/
            }

            seccion.descripcion = this.petitionService.sanitizeHtml(seccion.descripcion)


            if(seccion.imagenes?.length > 0){
              seccion.imagenes.forEach((imagen:any) => {
                imagen.file = this.petitionService.sanitizar(imagen.file)
              })
            }
          })

          this.secciones = data;
        })

        this.loading = false

      })

    })
   }


   openPop(indice){
    document.getElementById('pop').classList.add('openFather');
    document.getElementById('contenido-pop').classList.add('openChild');
    this.popSeccion = this.secciones[indice]
   }

   closePop(){
    document.getElementById('contenido-pop').classList.add('closeChild');
    setTimeout(()=>{
      document.getElementById('pop').classList.remove('openFather');
      this.popSeccion = null
    },800)
    setTimeout(()=>{
      document.getElementById('contenido-pop').classList.remove('openChild');
      document.getElementById('contenido-pop').classList.remove('closeChild');
    }, 900)
   }

   downloadFile(fileName: string, base64Content: string): void {
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Crear un objeto URL a partir del Blob
    const url = URL.createObjectURL(blob);

    // Crear un enlace temporal
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Simular clic en el enlace temporal
    link.dispatchEvent(new MouseEvent('click'));

    // Liberar el objeto URL
    URL.revokeObjectURL(url);
  }

  removePdfPrefix(fileName: string): string {
    let resultado = fileName.replace(/\.pdf$/i, "");
    return resultado;
}

}
