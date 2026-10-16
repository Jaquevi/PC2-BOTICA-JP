import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../core/productos.service';
@Component({ selector: 'app-contacto', imports: [CommonModule, FormsModule], templateUrl: './contacto.html' })
export class ContactoComponent {
  readonly catalogo = inject(ProductosService);
  nombre = ''; producto = ''; tipoAtencion = 'recojo';
  readonly mensaje = signal('');
  constructor() { this.catalogo.cargar(); }
  consultar(): void {
    if (!this.nombre.trim() || !this.producto.trim()) { this.mensaje.set('Completa tu nombre y el producto que buscas.'); return; }
    if (this.catalogo.cargando()) { this.mensaje.set('Espera a que termine de cargar el catálogo.'); return; }
    if (this.catalogo.error()) { this.mensaje.set('No podemos consultar el catálogo en este momento. Comunícate por WhatsApp o reintenta la conexión.'); return; }
    const encontrado = this.catalogo.productos().find(p => p.nombre.toLowerCase().includes(this.producto.trim().toLowerCase()));
    const resultado = !encontrado ? 'No encontramos ese producto en el catálogo.' : encontrado.stock > 0
      ? `${encontrado.nombre} está disponible a S/ ${encontrado.precio.toFixed(2)}.` : `${encontrado.nombre} está agotado.`;
    this.mensaje.set(`Hola ${this.nombre.trim()}. ${resultado} Esta consulta es local; contáctanos por WhatsApp para confirmar tu reserva o atención.`);
  }
}
