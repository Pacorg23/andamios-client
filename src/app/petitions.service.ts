import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PetitionsService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private sanitizer: DomSanitizer) { }

  /**
   * @description Sanitiza una cadena para que sea segura para su uso en URLs.
   * @param cadena La cadena a sanitizar.
   * @return Un objeto SafeUrl si la cadena es válida, o null si la cadena es nula o indefinida.
   */
  public sanitizar(cadena: any): any | null {
    if (cadena) {
      cadena = this.sanitizer.bypassSecurityTrustUrl(cadena);
      return cadena;
    } else {
      return null;
    }
  }

  /**
   * @description Convierte una cadena en base64 a un objeto URL seguro para descargar como PDF.
   * @param cadena La cadena base64 del PDF.
   * @returns Una URL temporal (string) para descargar el archivo, o null si la entrada es inválida.
   */
  public sanitizarPdf(cadena: string | null | undefined): string | null {
    if (!cadena) return null;

    const byteCharacters = atob(cadena);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }

  /**
   * @description Sanitiza una cadena base64 como un recurso PDF seguro para insertar en un iframe o embed.
   * @param cadena La cadena base64 del PDF.
   * @returns Un objeto SafeResourceUrl que puede usarse de forma segura en el DOM.
   */
  public sanitizarPDF_main(cadena: string): SafeUrl{
    const pdfUrl = `data:application/pdf;base64,${cadena}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  /**
   * @description Sanitiza contenido HTML para evitar inyecciones y permitir mostrarlo en el DOM.
   * @param content El contenido HTML a sanitizar.
   * @returns Un objeto SafeHtml que puede insertarse de forma segura en el DOM.
   */
  public sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  /**
   * @description Convierte una cadena a minúsculas, elimina espacios y los reemplaza por guiones.
   * @param input La cadena a formatear.
   * @returns La cadena formateada con guiones.
   */
  public formatToDashes(input: string): string {
    const trimmed = _.lowerCase(_.trim(input));
    return _.replace(trimmed, /\s+/g, '-');
  }

  /**
   * @description Convierte guiones en espacios y elimina espacios extremos.
   * @param input La cadena con guiones.
   * @returns La cadena formateada con espacios.
   */
  public formatToSpaces(input: string): string {
    const replaced = _.replace(input, /-/g, ' ');
    return _.trim(replaced);
  }

  /**
   * @description Crea un enlace temporal y descarga un archivo PDF desde una cadena base64.
   * @param data Cadena base64 del archivo.
   * @param filename Nombre del archivo a descargar.
   */
  public readyToDownload(data: string, filename: string): void {
    const url = this.sanitizarPdf(data);
    if (!url) return;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download.pdf';
    a.click();
  }
}
