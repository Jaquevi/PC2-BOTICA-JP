import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../core/session.service';
import { ProductosService } from '../../core/productos.service';
@Component({ selector: 'app-dashboard', imports: [CommonModule, RouterLink], templateUrl: './dashboard.html' })
export class DashboardComponent {
  readonly sesion = inject(SessionService);
  readonly catalogo = inject(ProductosService);
  private readonly router = inject(Router);
  readonly disponibles = computed(() => this.catalogo.productos().filter(p => p.stock > 0).length);
  readonly agotados = computed(() => this.catalogo.productos().filter(p => p.stock === 0));
  readonly unidades = computed(() => this.catalogo.productos().reduce((total, p) => total + p.stock, 0));
  readonly valorInventario = computed(() => this.catalogo.productos().reduce((total, p) => total + p.precio * p.stock, 0));
  constructor() { this.catalogo.cargar(); }
  salir(): void { this.sesion.cerrar(); void this.router.navigate(['/home']); }
}
