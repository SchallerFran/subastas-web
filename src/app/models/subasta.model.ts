export interface Producto {
  id: number;
  imgUrl?: string;
  titulo: string;
  descripcion: string;
  precioInicial: number;
  precioActual: number;
  fechaInicio: Date;
  fechaFin: Date;
  activa: boolean;
}
