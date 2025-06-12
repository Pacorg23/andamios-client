export interface Carrusel {
  id: number;
  filename: string; // Nombre del archivo de la imagen
  file: string; // Imagen en formato Base64
  fileResponsive: string; // Imagen en formato Base64 para pantallas pequeñas
  needsAction: boolean; // Indica si se necesita una acción al hacer clic en la imagen
  action: string; // Acción a realizar al hacer clic en la imagen
}
