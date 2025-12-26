import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presentacion.html',
  styleUrls: ['./presentacion.css']
})
export class PresentacionComponent implements OnInit, OnDestroy {

  imagenes: string[] = [
    '/presentacion/imagen1.jpeg',
    '/presentacion/imagen2.webp',
    '/presentacion/imagen3.webp'
  ];


  imagenActual = 0;
  intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.imagenActual =
        (this.imagenActual + 1) % this.imagenes.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  scrollASubastas() {
    const el = document.getElementById('lista-productos');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

}
