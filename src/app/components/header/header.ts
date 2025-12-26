import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  scrollASubastas() {
    const el = document.getElementById('lista-productos');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollAContacto() {
    const el = document.getElementById('contacto');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollAQuienesSomos() {
    const el = document.getElementById('quienes-somos');
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
