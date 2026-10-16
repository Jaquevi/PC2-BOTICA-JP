import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection(), provideHttpClient(), provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }))]
}).catch(console.error);
