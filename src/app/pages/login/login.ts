import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../core/session.service';

@Component({ selector: 'app-login', imports: [CommonModule, FormsModule, RouterLink], templateUrl: './login.html' })
export class LoginComponent {
  readonly sesion = inject(SessionService);
  private readonly router = inject(Router);
  readonly error = signal('');
  correo = '';
  clave = '';
  entrar(formulario: NgForm): void {
    this.error.set('');
    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      this.error.set('Revisa tu correo y contraseña antes de ingresar.');
      return;
    }
    try {
      if (!this.sesion.iniciar(this.correo, this.clave)) {
        this.error.set('Correo o contraseña incorrectos.');
        return;
      }
      this.clave = '';
      void this.router.navigate(['/dashboard']);
    } catch {
      this.error.set('No se pudo guardar la sesión. Permite el almacenamiento local en tu navegador e intenta nuevamente.');
    }
  }
}
