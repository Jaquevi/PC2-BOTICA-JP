import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Producto } from '../../core/producto.model';
import { ProductosService } from '../../core/productos.service';
import { CarritoService } from '../../core/carrito.service';
@Component({ selector: 'app-productos', imports: [CommonModule, FormsModule, RouterLink], templateUrl: './productos.html' })
export class ProductosComponent {
  readonly catalogo = inject(ProductosService);
  readonly carrito = inject(CarritoService);
  readonly busqueda = signal('');
  readonly categoria = signal('Todas');
  readonly mensaje = signal('');
  readonly filtrados = computed(() => this.catalogo.productos().filter(p =>
    (this.categoria() === 'Todas' || p.categoria === this.categoria()) &&
    this.normalizar(p.nombre).includes(this.normalizar(this.busqueda()))));
  constructor() { this.catalogo.cargar(); }
  private normalizar(texto: string): string { return texto.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  trackProducto(_indice: number, producto: Producto): number { return producto.id; }
  imagenAlternativa(evento: Event): void {
    const imagen = evento.target as HTMLImageElement;
    if (!imagen.src.endsWith('/images/producto-generico.svg')) imagen.src = '/images/producto-generico.svg';
  }
  agregar(producto: Producto): void {
    this.mensaje.set(this.carrito.agregar(producto) ? `${producto.nombre} agregado al carrito.` : 'Alcanzaste el stock disponible de este producto.');
  }
}
