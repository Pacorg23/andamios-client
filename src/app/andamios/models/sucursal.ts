import { SafeUrl } from "@angular/platform-browser"

export class Sucursal{
  id:number
  nombre:string
  direccion:string
  telefono:any
  maps:string
  division:string
  imagen?:string
  imagenResponsive?:string
  imgSafe?:SafeUrl
  descripcion?:string
  size?:string
}
