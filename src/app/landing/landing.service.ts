import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archivo } from './models/archivo';
import { Comunicado } from './models/comunicado';
import { ENV_CONSTANTS } from '../../environment';

const SECTION_NAME = 'api';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  private URL: string = ""

  constructor(private http: HttpClient) {
    if (!ENV_CONSTANTS.PRODUCTION) {
      this.URL = `${ENV_CONSTANTS.DEV_URL}:${ENV_CONSTANTS.PORT}/${SECTION_NAME}/`;
    } else {
      this.URL = `${ENV_CONSTANTS.API_URL}/${SECTION_NAME}/`;
    }
  }

  obtenerArchivo(origen: string): Observable<Archivo> {
    return this.http.get<Archivo>(`${this.URL}obtenerArchivo/${origen}`)
  }

  obtenerComunicados(): Observable<Comunicado[]> {
    return this.http.get<Comunicado[]>(`${this.URL}obtenerComunicados`)
  }

  enviarFormulario(formData: FormData) {
    return this.http.post(`${this.URL}crearSolicitud`, formData)
  }
  enviarContacto(formData: FormData) {
    return this.http.post(`${this.URL}crearContacto`, formData)
  }

}
