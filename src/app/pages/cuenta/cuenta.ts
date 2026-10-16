import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../core/session.service';
@Component({ selector: 'app-cuenta', imports: [CommonModule, RouterLink], template: `
  <section class="section container"><h1 class="section-title">Mi Cuenta</h1><article class="card account-card">
    <ng-container *ngIf="sesion.usuario() as usuario; else sinSesion">
      <h2 class="h4">Hola, {{ usuario.nombre }}</h2><p>{{ usuario.correo }}</p>
      <p>Rol: {{ usuario.rol }}</p><p>Sesión iniciada: {{ usuario.inicioSesion | date:'dd/MM/yyyy HH:mm' }}</p>
      <a routerLink="/dashboard" class="btn btn-success">Ir al Dashboard</a>
      <button class="btn btn-outline-danger" (click)="salir()">Cerrar sesión</button>
    </ng-container>
    <ng-template #sinSesion><h2 class="h4">Bienvenido a JP</h2><p>Inicia sesión para acceder a tu espacio personal.</p><a routerLink="/login" class="btn btn-success">Ir al Login</a></ng-template>
  </article></section>
` })
export class CuentaComponent {
  readonly sesion = inject(SessionService);
  private readonly router = inject(Router);
  salir(): void { this.sesion.cerrar(); void this.router.navigate(['/home']); }
}
