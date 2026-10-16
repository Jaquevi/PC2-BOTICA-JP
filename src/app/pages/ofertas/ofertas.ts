import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector: 'app-ofertas', imports: [RouterLink], template: `
  <section class="section container"><span class="eyebrow">MÁS CUIDADO, MÁS AHORRO</span><h1 class="section-title">Ofertas y promociones</h1>
  <p>Promociones de referencia del proyecto. Consulta vigencia y condiciones antes de reservar.</p><div class="row g-4">
    @for (oferta of ofertas; track oferta.titulo) { <div class="col-md-6 col-lg-4"><article class="card promo-card h-100"><span class="promo-symbol" aria-hidden="true">{{ oferta.icono }}</span><h2 class="h4">{{ oferta.titulo }}</h2><p>{{ oferta.texto }}</p><a routerLink="/contacto" class="btn-primary">Consultar oferta</a></article></div> }
  </div></section>
` })
export class OfertasComponent {
  readonly ofertas = [
    { titulo: '20% en Vitaminas', texto: 'Consulta por las vitaminas participantes en tienda.', icono: '💊' },
    { titulo: '2x1 en Jabones', texto: 'Lleva dos y paga uno en productos seleccionados.', icono: '🧼' },
    { titulo: '15% en Antigripales', texto: 'Consulta disponibilidad y productos participantes.', icono: '🏷' }
  ];
}
