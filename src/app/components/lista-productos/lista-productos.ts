import { Component } from '@angular/core';
import { Producto } from '../../models/subasta.model';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../services/productos';
import { CommonModule } from '@angular/common';
import { DescuentoPipe } from '../../pipes/descuento-pipe';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, DescuentoPipe, FormsModule],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {
  products: Producto[] = [];
  loading: Boolean = true;
  porcentaje_descuento: number = 10;
  private sub?: Subscription;

  constructor(private ProductoService: ProductosService){}

  ngOnInit(){
    this.sub = this.ProductoService.getProductos().subscribe((productos_lista: Producto[]) => {
      const hoy = new Date();
      this.products = productos_lista.map(p => {
          if (new Date(p.fechaFin) < hoy) {
            return { ...p, activa: false };
          }
          return p;
        });
        this.loading = false;
      }
    )
  }

  eliminar(product_id: number){
    this.ProductoService.deleteProducto(product_id)
  }

  simularAgregarProducto (){
    this.ProductoService.addProduct(
      {
        imgUrl: '/subastas/play5.webp',
        titulo: 'Consola PlayStation 5',
        descripcion: 'Consola PlayStation 5 con joystick original, en excelente estado y funcionamiento impecable.',
        precioInicial: 600000,
        precioActual: 680000,
        fechaInicio: new Date('2025-01-12T14:00:00'),
        fechaFin: new Date('2025-01-17T22:30:00'),
        activa: true
      }
    )
  }
  limpiar(){
    this.products.forEach((product) => this.ProductoService.deleteProducto(product.id))
  }

  productoSeleccionado: Producto | null = null;
  montoOferta: number = 0;

  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    this.montoOferta = producto.precioActual + 1;
  }

  cerrarModal() {
    this.productoSeleccionado = null;
    this.montoOferta = 0;
  }

  ofertar() {
    if (!this.productoSeleccionado) return;

    if (this.montoOferta <= this.productoSeleccionado.precioActual) {
      alert('La oferta debe ser mayor al precio actual');
      return;
    }

    this.productoSeleccionado.precioActual = this.montoOferta;
    this.cerrarModal();
  }

  @ViewChild('carousel') carousel!: ElementRef;

  scrollRight() {
    const el = this.carousel.nativeElement;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScroll - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } 
    else {
      el.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  scrollLeft() {
    const el = this.carousel.nativeElement;
    if (el.scrollLeft <= 10) {
      const maxScroll = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } 
    else {
      el.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

}
