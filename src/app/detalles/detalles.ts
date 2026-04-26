import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.html',
  styleUrl: './detalles.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Detalles {}
