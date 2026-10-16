import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, timeout } from 'rxjs';
import { Producto } from './producto.model';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = 'http://127.0.0.1:3000/productos';
  readonly productos = signal<Producto[]>([]);
  readonly cargando = signal(false);
  readonly error = signal('');
  readonly categorias = computed(() => [...new Set(this.productos().map(p => p.categoria))].sort());
  cargar(): void {
    if (this.cargando()) return;
    this.error.set('');
    this.cargando.set(true);
    this.productos.set([]);
    this.http.get<Producto[]>(this.endpoint).pipe(timeout(8000), finalize(() => this.cargando.set(false))).subscribe({
      next: productos => this.productos.set(productos),
      error: () => this.error.set('No se pudo cargar el catálogo. Comprueba que JSON Server esté ejecutándose con npm run api y vuelve a intentar.')
    });
  }
}
