import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.html',
  styleUrl: './calendario.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calendario {
  protected readonly calendar = [
    ['', 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30],
  ];

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
