import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SolicitudesServices } from '../../services/solicitudes.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Person } from '../../models/person';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Solicitud } from '../../models/solicitudes';
dayjs.extend(utc);

@Component({
  selector: 'app-newpost',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.css',
})
export class NewpostComponent {
  SolicitudForm: FormGroup;
  dialogRef = inject(MatDialogRef<NewpostComponent>);
  solicitudesService = inject(SolicitudesServices);
  fb = inject(FormBuilder);
  constructor() {
    this.SolicitudForm = this.fb.group({
      idUsuario: [1, Validators.required], // ejemplo fijo
      descripcion: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(0.01)]],
      fechaEsperada: [dayjs().format('YYYY-MM-DD'), Validators.required],
      estadoSolicitud: ['Pendiente'],
      estado: [1],
      idSupervisor: [0],
      comentario: [''],
      fechaRegistro: [dayjs().format('YYYY-MM-DD')],
      fechaModificacion: [dayjs().format('YYYY-MM-DD')],
    });
  }

  onSubmit() {
    if (this.SolicitudForm.valid) {
      const newSolicitud: Solicitud = this.SolicitudForm.value;
      this.solicitudesService.createPost(newSolicitud).subscribe({
        next: () => {
          this.dialogRef.close('success');
          alert('La solicitud fue creada correctamente.');
        },
        error: (err) => {
          alert('No se pudo crear la solicitud.');
          console.log(err + 'error');
          this.dialogRef.close('error');
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
