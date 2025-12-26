import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { PresentacionComponent } from './components/presentacion/presentacion';
import { ListaProductos } from './components/lista-productos/lista-productos';
import { QuienesSomos } from './components/quienes-somos/quienes-somos';
import { ContactoComponent } from './components/contacto/contacto';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, PresentacionComponent, ListaProductos, QuienesSomos, ContactoComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('subastas-web');
}
