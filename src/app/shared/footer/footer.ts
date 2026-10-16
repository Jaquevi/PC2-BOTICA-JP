import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector: 'app-footer', imports: [RouterLink], template: `
  <footer><div class="container"><p><strong>JP · Juntos por el Perú</strong> © 2026 · Cuidamos tu salud</p>
  <a routerLink="/tienda">Visítanos</a> · <a routerLink="/contacto">Contáctanos</a></div></footer>
` })
export class FooterComponent {}
