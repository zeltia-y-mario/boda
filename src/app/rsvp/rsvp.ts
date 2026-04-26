import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Rsvp {}
