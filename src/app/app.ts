import { Component, signal } from '@angular/core';
import { Toolbar } from './toolbar/toolbar';
import { Inicio } from './inicio/inicio';
import { Rsvp } from './rsvp/rsvp';
import { Regalo } from './regalo/regalo';
import { Calendario } from './calendario/calendario';
import { Detalles2 } from './detalles2/detalles2';

@Component({
  selector: 'app-root',
  imports: [Toolbar, Inicio, Rsvp, Regalo, Detalles2, Calendario],
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
      const toolbarHeight = 64; // Match your toolbar height in app.scss
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - toolbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
}
