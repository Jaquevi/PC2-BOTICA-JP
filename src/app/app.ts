import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';

@Component({ selector: 'app-root', imports: [RouterOutlet, NavbarComponent, FooterComponent], template: `
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <app-navbar />
  <main id="contenido" tabindex="-1"><router-outlet /></main>
  <app-footer />
  <a href="https://wa.me/51908633134" class="whatsapp-float" aria-label="Contactar por WhatsApp">WA</a>
` })
export class AppComponent {}
