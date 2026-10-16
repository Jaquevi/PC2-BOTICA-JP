import { Injectable, computed, signal } from '@angular/core';
import { Producto } from './producto.model';
export interface ItemCarrito { producto: Producto; cantidad: number; }

@Injectable({ providedIn: 'root' })
export class CarritoService {
  readonly items = signal<ItemCarrito[]>([]);
  readonly total = computed(() => this.items().reduce((s, i) => s + i.producto.precio * i.cantidad, 0));
  readonly cantidad = computed(() => this.items().reduce((s, i) => s + i.cantidad, 0));
  agregar(producto: Producto): boolean {
    const actual = this.items().find(i => i.producto.id === producto.id);
    if ((actual?.cantidad ?? 0) >= producto.stock) return false;
    this.items.update(items => actual
      ? items.map(i => i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i)
      : [...items, { producto, cantidad: 1 }]);
    return true;
  }
  eliminar(id: number): void { this.items.update(items => items.filter(i => i.producto.id !== id)); }
  vaciar(): void { this.items.set([]); }
}
