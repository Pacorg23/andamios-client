import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrusel } from './models/carrusel';
import { Anuncio } from './models/anuncio';
import { PetitionsService } from '../petitions.service';
import { Seccion } from './models/seccion';
import { Categoria } from './models/categoria';
import { Sucursal } from './models/sucursal';
import { Imagen } from './models/imagen';
import { ENV_CONSTANTS } from '../../environment';

const SECTION_NAME = 'api';

@Injectable({
  providedIn: 'root'
})
export class AndamiosService {

  private URL: string = ""

  constructor(private http: HttpClient, private petition: PetitionsService) {
    this.URL = `${ENV_CONSTANTS.API_URL}:${ENV_CONSTANTS.PORT}/${SECTION_NAME}/`
  }

  /* NAVBAR */
  obtenerNavbar() {
    return this.http.get(`${this.URL}navbar/andamios`)
  }

  /* PANTALLA CATEGORIAS */
  obtenerTipoCategoria(tipo: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.URL}obtenerTipoCategoria/${tipo}`)
  }

  obtenerSecciones(categoria: any): Observable<Seccion[]> {
    return this.http.post<Seccion[]>(`${this.URL}obtenerSecciones`, categoria, this.petition.httpOptions)
  }

  /* PANTALLA INICIO */
  obtenerCarrusel(): Observable<Carrusel[]> {
    return this.http.get<Carrusel[]>(`${this.URL}obtenerCarrusel`)
  }

  obtenerAnuncio(): Observable<Anuncio> {
    return this.http.get<Anuncio>(`${this.URL}obtenerAnuncio`)
  }

  obtenerInicio() {
    return this.http.get(`${this.URL}obtenerInicio/andamios`)
  }

  /* PANTALLA SUCURSALES */

  obtenerImaganSucursal(division: string): Observable<Imagen> {
    return this.http.get<Imagen>(`${this.URL}obtenerImagenSucursal/${division}`)
  }

  obtenerSucursales(division: string): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`${this.URL}obtenerSucursales/${division}`)
  }

  /* PANTALLA SECCIONES */
  obtenerSeccion(nombre: string): Observable<Seccion> {
    return this.http.get<Seccion>(`${this.URL}obtenerSeccion/${nombre}`)
  }

  obtenerSubseccion(nombre: string): Observable<Seccion> {
    return this.http.get<Seccion>(`${this.URL}obtenerSubseccion/${nombre}`)
  }

  obtenerSubseccionPorSeccion(nombre: string): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(`${this.URL}obtenerSubseccion/seccion/${nombre}`)
  }

}
