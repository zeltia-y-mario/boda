import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './toolbar/toolbar';
import { Inicio } from './inicio/inicio';
import { Rsvp } from './rsvp/rsvp';
import { Regalo } from './regalo/regalo';
import { Gracias } from './gracias/gracias';
import { Detalles } from './detalles/detalles';

@Component({
  selector: 'app-root',
  imports: [Toolbar, Inicio, Rsvp, Regalo, Gracias, Detalles],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('web-boda');
  protected activeSection = signal('');

  ngAfterViewInit() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.6, // 60% visible = active
      },
    );

    sections.forEach((section) => observer.observe(section));
  }

  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
