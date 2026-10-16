import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from './session.service';

// Devuelve un UrlTree para que Angular cancele la ruta y redirija al Home.
export const authGuard: CanActivateFn = () =>
  inject(SessionService).autenticado() ? true : inject(Router).createUrlTree(['/home']);
