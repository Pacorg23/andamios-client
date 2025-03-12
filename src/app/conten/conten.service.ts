import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV_CONSTANTS } from '../../environment';

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

}
