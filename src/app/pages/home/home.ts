import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector: 'app-home', imports: [RouterLink], templateUrl: './home.html' })
export class HomeComponent {
  readonly consejos = [
    { titulo: '💧 Hidrátate bien', texto: 'Cuida tu hidratación durante el día.' },
    { titulo: '🥗 Alimentación balanceada', texto: 'Incluye frutas y verduras en tus comidas.' },
    { titulo: '😴 Descansa', texto: 'Mantén horarios de descanso regulares.' },
    { titulo: '🏃 Mantente activo', texto: 'Dedica tiempo a una actividad física que disfrutes.' },
    { titulo: '🩺 Cuida tu salud', texto: 'Consulta con un profesional ante cualquier duda.' },
    { titulo: '🧘 Haz una pausa', texto: 'Busca momentos para relajarte y respirar.' }
  ];
}
