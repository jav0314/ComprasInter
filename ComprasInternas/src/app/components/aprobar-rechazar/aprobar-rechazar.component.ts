import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Solicitud } from '../../models/solicitudes';
import { SolicitudesServices } from '../../services/solicitudes.service';

@Component({
  selector: 'app-aprobar-rechazar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './aprobar-rechazar.component.html',
  styleUrl: './aprobar-rechazar.component.css',
})
export class AprobarRechazarComponent {
  dialogRef = inject(MatDialogRef<AprobarRechazarComponent>);
  data = inject(MAT_DIALOG_DATA) as Solicitud;
  fb = inject(FormBuilder);
  service = inject(SolicitudesServices);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      comentario: [''],
    });

    if (this.data.monto > 5000) {
      this.form.get('comentario')?.setValidators([Validators.required]);
    }
  }

  aprobar() {
    if (this.form.valid) {
      const dto: Solicitud = {
        ...this.data,
        comentario: this.form.value.comentario,
      };

      this.service.aprobarSolicitud(dto).subscribe({
        next: () => {
          alert('Solicitud aprobada.');
          this.dialogRef.close('success');
        },
        error: () => {
          alert('Error al aprobar.');
          this.dialogRef.close('error');
        },
      });
    }
  }

  rechazar() {
    const dto: Solicitud = {
      ...this.data,
      comentario: this.form.value.comentario,
    };

    this.service.rechazarSolicitud(dto).subscribe({
      next: () => {
        alert('Solicitud rechazada.');
        this.dialogRef.close('success');
      },
      error: () => {
        alert('Error al rechazar.');
        this.dialogRef.close('error');
      },
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
