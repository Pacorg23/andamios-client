import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV_CONSTANTS } from '../../environment';
import { Category } from './models/category';
import { Observable } from 'rxjs';
import { Section } from './models/seccion';
import { Carrusel } from './models/carrusel';
import { Sucursal } from '../andamios/models/sucursal';

const SECTION_NAME = 'api';

@Injectable({
  providedIn: 'root'
})
export class ContenService {

  private URL: string = ""

  constructor(private http: HttpClient) {
    if (!ENV_CONSTANTS.PRODUCTION) {
      this.URL = `${ENV_CONSTANTS.DEV_URL}:${ENV_CONSTANTS.PORT}/${SECTION_NAME}/`;
    } else {
      this.URL = `${ENV_CONSTANTS.API_URL}/${SECTION_NAME}/`;
    }
  }

  /**
   * @description Envia formulario de contacto
   * @param {FormData} formData que contiene los datos del formulario
   * @return {Observable} Observable que emite la respuesta del servidor
   */
  public enviarFormulario(formData: FormData) {
    return this.http.post(`${this.URL}crearSolicitud`, formData)
  }

  /**
   * @description Obtiene el contenido de la barra de navegación
   * @return {Observable} Observable que emite el contenido de la barra de navegación
   */
  public obtenerNavbar() {
    return this.http.get(`${this.URL}obtenerNavBarConten`)
  }

  /**
   * @description Obtiene el contenido de la categoría
   * @param {string} url URL de la categoría
   * @return {Observable<Category>} Observable que emite la categoría
   */
  public obtenerCategoria(url: string): Observable<Category> {
    return this.http.get<Category>(`${this.URL}obtenerCategoria/${url}`);
  }

  /**
   * @description Obtiene el contenido de la sección
   * @param {string} url URL de la sección
   * @return {Observable<Section>} Observable que emite la sección
   */
  public obtenerSeccionConten(url: string): Observable<Section> {
    return this.http.get<Section>(`${this.URL}/obtenerSeccionConten/${url}`);
  }

  /**
   * @description Obtiene el contenido de la subsección
   * @param {string} url URL de la subsección
   * @return {Observable<Section>} Observable que emite la subsección
   */
  public obtenerSubSeccionConten(url: string): Observable<Section> {
    return this.http.get<Section>(`${this.URL}/obtenerSubSeccionConten/${url}`);
  }

  /**
   * @description Obtiene las categorías
   * @return {Observable<Category[]>} Observable que emite un array de categorías
   */
  public obtenerSecciones(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}obtenerNavBarConten`)
  }

  /**
   * @description Obtiene las subsecciones
   * @return {Observable<Section[]>} Observable que emite un array de subsecciones
   */
  public obtenerSubsecciones(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.URL}obtenerNavBarConten`)
  }

  /**
   * @description Obtiene el contenido del carrusel
   * @return {Observable<Carrusel[]>} Observable que emite un array de carruseles
   */
  public obtenerCarrusel(): Observable<Carrusel[]> {
    return this.http.get<Carrusel[]>(`${this.URL}obtenerCarruselConten`);
  }

  public obtenerPlantas(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`${this.URL}obtenerPlantas`);
  }
}
