import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Rsvp {
  private dialog = inject(MatDialog);
  private readonly http = inject(HttpClient);

  protected async onSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    this.http.post('https://api.web3forms.com/submit', formData).subscribe({
      next: () => {
        this.dialog.open(RsvpSuccessDialog);
      },
      error: () => {
        this.dialog.open(RsvpErrorDialog, {
          data: {
            message: 'No se pudo enviar el formulario. Intenta de nuevo más tarde.',
          },
        });
      },
    });
  }
}

@Component({
  imports: [MatButton],
  template: `
    <div class="dialog-content">
      <h2>¡Gracias!</h2>
      <p>Tu RSVP se ha enviado correctamente.</p>
      <button mat-flat-button color="primary" (click)="close()">Cerrar</button>
    </div>
  `,
  styles: [
    `
      .dialog-content {
        padding: 24px;
        text-align: center;
      }

      h2 {
        margin-top: 0;
      }
    `,
  ],
})
export class RsvpSuccessDialog {
  private readonly dialogRef = inject(MatDialogRef<RsvpSuccessDialog>);

  close() {
    this.dialogRef.close();
  }
}

@Component({
  standalone: true,
  imports: [MatButton],
  template: `
    <div class="dialog-content">
      <h2>Error</h2>
      <p>{{ data.message }}</p>
      <button mat-flat-button color="primary" (click)="close()">Cerrar</button>
    </div>
  `,
  styles: [
    `
      .dialog-content {
        padding: 24px;
        text-align: center;
      }

      h2 {
        margin-top: 0;
      }
    `,
  ],
})
export class RsvpErrorDialog {
  private readonly dialogRef = inject(MatDialogRef<RsvpErrorDialog>);
  readonly data = inject(MAT_DIALOG_DATA) as { message: string };

  close() {
    this.dialogRef.close();
  }
}
