import { Injectable, signal } from '@angular/core';

export interface UsuarioSesion {
  id: number; nombre: string; correo: string; rol: 'Administrador'; inicioSesion: string;
}
export const SESION_KEY = 'jp.usuario';
export const CUENTA_DEMO = { correo: 'admin@jp.pe', clave: 'JP2026!', nombre: 'Administrador JP' };

// Simulación educativa: la contraseña nunca se almacena en LocalStorage.
@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly usuario = signal<UsuarioSesion | null>(this.leerSesion());
  iniciar(correo: string, clave: string): boolean {
    if (correo.trim().toLowerCase() !== CUENTA_DEMO.correo || clave !== CUENTA_DEMO.clave) return false;
    const usuario: UsuarioSesion = {
      id: 1, nombre: CUENTA_DEMO.nombre, correo: CUENTA_DEMO.correo,
      rol: 'Administrador', inicioSesion: new Date().toISOString()
    };
    localStorage.setItem(SESION_KEY, JSON.stringify(usuario));
    this.usuario.set(usuario);
    return true;
  }
  autenticado(): boolean {
    const usuario = this.leerSesion();
    this.usuario.set(usuario);
    return usuario !== null;
  }
  cerrar(): void {
    localStorage.removeItem(SESION_KEY);
    this.usuario.set(null);
  }
  private leerSesion(): UsuarioSesion | null {
    try {
      const raw = localStorage.getItem(SESION_KEY);
      if (!raw) return null;
      const valor: unknown = JSON.parse(raw);
      if (!valor || typeof valor !== 'object') return null;
      const u = valor as Partial<UsuarioSesion>;
      if (u.id !== 1 || u.correo !== CUENTA_DEMO.correo || u.nombre !== CUENTA_DEMO.nombre ||
          u.rol !== 'Administrador' || typeof u.inicioSesion !== 'string' ||
          !Number.isFinite(Date.parse(u.inicioSesion))) return null;
      return u as UsuarioSesion;
    } catch { return null; }
  }
}
