import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../core/carrito.service';
@Component({ selector: 'app-tienda', imports: [CurrencyPipe, RouterLink], templateUrl: './tienda.html' })
export class TiendaComponent {
  readonly carrito = inject(CarritoService);
  readonly mensaje = signal('');
  finalizar(): void {
    if (!this.carrito.items().length) return;
    this.mensaje.set(`Compra de demostración completada por ${this.carrito.total().toFixed(2)} soles. No se realizó un cobro ni un pedido real.`);
    this.carrito.vaciar();
  }
}
