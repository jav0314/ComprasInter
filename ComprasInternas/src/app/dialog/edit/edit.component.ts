import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SolicitudesServices } from '../../services/solicitudes.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<EditComponent>);
  solicitudesService = inject(SolicitudesServices);
  fb = inject(FormBuilder);

  editForm: FormGroup;

  constructor() {
    this.editForm = this.fb.group({
      idSolicitud: [{ value: this.data.idSolicitud, disabled: true }],
      descripcion: [this.data.descripcion],
      monto: [this.data.monto],
      fechaEsperada: [this.data.fechaEsperada],
    });
    
  }

  onSave() {
    if (this.editForm.valid) {
      const updatedSolicitud = this.editForm.getRawValue();
  
      this.solicitudesService.editPut(updatedSolicitud).subscribe({
        next: () => {
          alert('Solicitud actualizada correctamente.');
          this.dialogRef.close('success');
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar la solicitud.');
          this.dialogRef.close('error');
        },
      });
    }
  }
  

  onCancel() {
    this.dialogRef.close();
  }
}
