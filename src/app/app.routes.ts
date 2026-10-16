import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { HomeComponent } from './pages/home/home';
import { ProductosComponent } from './pages/productos/productos';
import { OfertasComponent } from './pages/ofertas/ofertas';
import { TiendaComponent } from './pages/tienda/tienda';
import { ContactoComponent } from './pages/contacto/contacto';
import { CuentaComponent } from './pages/cuenta/cuenta';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Inicio | JP' },
  { path: 'productos', component: ProductosComponent, title: 'Productos | JP' },
  { path: 'ofertas', component: OfertasComponent, title: 'Ofertas | JP' },
  { path: 'tienda', component: TiendaComponent, title: 'Tienda | JP' },
  { path: 'contacto', component: ContactoComponent, title: 'Contacto | JP' },
  { path: 'mi-cuenta', component: CuentaComponent, title: 'Mi Cuenta | JP' },
  { path: 'login', component: LoginComponent, title: 'Login | JP' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], title: 'Dashboard | JP' },
  { path: '**', component: NotFoundComponent, title: 'Página no encontrada | JP' }
];
