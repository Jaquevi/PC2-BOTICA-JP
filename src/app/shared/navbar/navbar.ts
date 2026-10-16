import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SessionService } from '../../core/session.service';

@Component({ selector: 'app-navbar', imports: [CommonModule, RouterLink, RouterLinkActive], templateUrl: './navbar.html' })
export class NavbarComponent {
  readonly sesion = inject(SessionService);
  private readonly router = inject(Router);
  readonly abierto = signal(false);
  readonly oscuro = signal(false);
  readonly accesible = signal(false);
  readonly enlaces = [
    { ruta: '/home', texto: 'Inicio' }, { ruta: '/productos', texto: 'Productos' },
    { ruta: '/ofertas', texto: 'Ofertas' }, { ruta: '/tienda', texto: 'Tienda' },
    { ruta: '/contacto', texto: 'Contacto' }, { ruta: '/mi-cuenta', texto: 'Mi Cuenta' }
  ];
  toggleMenu(): void { this.abierto.update(v => !v); }
  salir(): void { this.sesion.cerrar(); this.abierto.set(false); void this.router.navigate(['/home']); }
  tema(): void { this.oscuro.update(v => !v); document.body.classList.toggle('dark-mode', this.oscuro()); }
  accesibilidad(): void { this.accesible.update(v => !v); document.documentElement.classList.toggle('modo-accesible', this.accesible()); }
}
