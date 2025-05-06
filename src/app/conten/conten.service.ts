import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV_CONSTANTS } from '../../environment';
import { Category } from './models/category';
import { Observable } from 'rxjs';
import { Section } from './models/seccion';

const SECTION_NAME = 'api';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  private URL: string = ""

  constructor(private http: HttpClient) {
    this.URL = `${ENV_CONSTANTS.API_URL}:${ENV_CONSTANTS.PORT}/${SECTION_NAME}/`
  }


  enviarFormulario(formData: FormData) {
    return this.http.post(`${this.URL}crearSolicitud`, formData)
  }
  obtenerNavbar() {
    return this.http.get(`${this.URL}obtenerNavBarConten`)
  }
  public obtenerCategoria(url:string): Observable<Category> {
    return this.http.get<Category>(`${this.URL}/obtenerCategoria/${url}`);
  }
  public obtenerSeccionManufact(url:string): Observable<Section> {
    return this.http.get<Section>(`${this.URL}/obtenerSeccionManufact/${url}`);
  }
  public obtenerSubSeccionManufact(url:string): Observable<Section> {
    return this.http.get<Section>(`${this.URL}/obtenerSubSeccionManufact/${url}`);
  }
  obtenerSecciones() {
    return this.http.get(`${this.URL}obtenerNavBarConten`)
  }
  obtenerSubsecciones() {
    return this.http.get(`${this.URL}obtenerNavBarConten`)
  }
}
