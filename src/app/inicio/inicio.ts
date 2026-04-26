import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inicio implements OnInit, OnDestroy {
  private targetDate = new Date('2026-09-21T15:00:00'); // Fecha y hora del evento
  private intervalId?: number;

  protected readonly countdown = signal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  ngOnInit() {
    this.updateCountdown();
    this.intervalId = window.setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId);
    }
  }

  private updateCountdown() {
    const now = new Date();
    const difference = this.targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      this.countdown.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      if (this.intervalId !== undefined) {
        window.clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
      return;
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.countdown.set({ days, hours, minutes, seconds });
  }
}
