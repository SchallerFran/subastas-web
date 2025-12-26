import { Injectable } from '@angular/core';
import { Producto } from '../models/subasta.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private inicial: Producto[] = [
    {
      id: 1,
      imgUrl: '/subastas/Notebook Gamer ASUS ROG.webp',
      titulo: 'Notebook Gamer ASUS ROG',
      descripcion: 'Notebook gamer de alto rendimiento con placa de video dedicada, ideal para gaming y trabajos exigentes.',
      precioInicial: 350000,
      precioActual: 420000,
      fechaInicio: new Date('2025-12-21T10:00:00'),
      fechaFin: new Date('2026-01-02T20:00:00'),
      activa: true
    },
    {
      id: 2,
      imgUrl: '/subastas/iPhone 13 128GB.webp',
      titulo: 'iPhone 13 128GB',
      descripcion: 'iPhone 13 en excelente estado, con caja original y batería en óptimas condiciones.',
      precioInicial: 500000,
      precioActual: 610000,
      fechaInicio: new Date('2025-12-09T09:00:00'),
      fechaFin: new Date('2025-12-31T21:00:00'),
      activa: true
    },
    {
      id: 3,
      imgUrl: '/subastas/Bicicleta Mountain Bike Rodado 29.webp',
      titulo: 'Bicicleta Mountain Bike Rodado 29',
      descripcion: 'Bicicleta rodado 29 con frenos a disco y suspensión delantera, ideal para terrenos mixtos.',
      precioInicial: 180000,
      precioActual: 215000,
      fechaInicio: new Date('2025-12-21T08:00:00'),
      fechaFin: new Date('2025-12-26T18:00:00'),
      activa: false
    },
    {
      id: 4,
      imgUrl: '/subastas/tele samsung.webp',
      titulo: 'Smart TV Samsung 55" 4K',
      descripcion: 'Televisor Samsung 55 pulgadas con resolución 4K UHD y sistema Smart TV.',
      precioInicial: 420000,
      precioActual: 495000,
      fechaInicio: new Date('2025-12-11T12:00:00'),
      fechaFin: new Date('2026-01-16T22:00:00'),
      activa: true
    },
    {
      id: 5,
      imgUrl: '/subastas/Reloj Inteligente Garmin.webp',
      titulo: 'Reloj Inteligente Garmin',
      descripcion: 'Reloj inteligente Garmin con GPS, medición de ritmo cardíaco y múltiples modos deportivos.',
      precioInicial: 150000,
      precioActual: 185000,
      fechaInicio: new Date('2025-01-08T07:30:00'),
      fechaFin: new Date('2025-01-13T19:00:00'),
      activa: false
    }
  ];

  private productosSubject = new BehaviorSubject<Producto[]>(this.inicial);
  private nextId = Math.max(...this.inicial.map(product => product.id)) + 1;
  
  constructor() { }
  
  getProductos() : Observable<Producto[]>{
    return this.productosSubject.asObservable();
  }

  addProduct (producto_parcial:Partial<Producto>){
    const productos_actuales = this.productosSubject.getValue()
    const new_id = this.nextId++
    const new_producto : Producto = {
      id: new_id,
      imgUrl: producto_parcial.imgUrl || '',
      titulo: producto_parcial.titulo || '',
      descripcion: producto_parcial.descripcion || '',
      precioInicial: producto_parcial.precioInicial ?? 0,
      precioActual: producto_parcial.precioActual ?? 0,
      fechaInicio: producto_parcial.fechaInicio? new Date(producto_parcial.fechaInicio): new Date(),
      fechaFin: producto_parcial.fechaFin? new Date(producto_parcial.fechaFin): new Date(),
      activa: producto_parcial.activa ?? false
    }
    this.productosSubject.next([...productos_actuales, new_producto])
  }

  deleteProducto(product_id: number){
    const productos_filtrados = this.productosSubject.getValue().filter(product => product.id !== product_id)

    this.productosSubject.next(productos_filtrados)
  }

  reset(){
    this.productosSubject.next([...this.inicial])
    this.nextId = Math.max(...this.inicial.map(product => product.id)) + 1
  }

}
