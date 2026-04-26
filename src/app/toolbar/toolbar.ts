import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toolbar {
  readonly active = input<string>();
  readonly sectionClicked = output<string>();

  protected readonly links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'detalles', label: 'Detalles' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'regalo', label: 'Regalo' },
  ];
}
