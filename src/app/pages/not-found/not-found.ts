import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector: 'app-not-found', imports: [RouterLink], template: `
  <section class="section container text-center"><p class="error-code">404</p><h1>Página no encontrada</h1><p>La dirección que buscas no existe. Vuelve a JP para encontrar lo que necesitas.</p><a routerLink="/home" class="btn-primary">Volver al Home</a></section>
` })
export class NotFoundComponent {}
