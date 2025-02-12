import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PetitionsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private sanitizer: DomSanitizer) { }

  sanitizar(cadena) {
    /*cadena = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + cadena);
    return cadena*/
    if (cadena) {
      //cadena = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + cadena);
      cadena = this.sanitizer.bypassSecurityTrustUrl(cadena);
      return cadena
    } else {
      return null;
    }
  }

  sanitizarPdf(cadena) {
    if (cadena) {
      const byteCharacters = atob(cadena);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Crear un objeto URL a partir del Blob
      const url = URL.createObjectURL(blob);

      return url
      //return cadena
    } else {
      return null;
    }
  }

  sanitizarPDF_main(cadena) {
    const pdfUrl = `data:application/pdf;base64,${cadena}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  formatToDashes(input: string): string {
    // Primero elimina espacios de los extremos
    const trimmed = _.lowerCase(_.trim(input));
    // Luego reemplaza los espacios intermedios por "-"
    return _.replace(trimmed, /\s+/g, '-');
  }

  formatToSpaces(input: string): string {
    // Reemplaza los guiones por espacios
    const replaced = _.replace(input, /-/g, ' ');
    // Luego elimina espacios de los extremos
    return _.trim(replaced);
  }

  readyToDownload(data: any, filename: string) {
    const url = this.sanitizarPdf(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download.pdf';
    a.click();
  }
}
