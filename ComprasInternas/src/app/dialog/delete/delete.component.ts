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
import { Solicitud } from '../../models/solicitudes';

@Component({
  selector: 'app-delete',
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
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DeleteComponent>);
  public listaSolicitud: Solicitud[] = [];
  solicitudService = inject(SolicitudesServices);
  deleteForm: FormGroup;
  fb = inject(FormBuilder);

  constructor() {
    this.deleteForm = this.fb.group({
      idSolicitud: [{ value: this.data.idSolicitud, disabled: true }],
      descripcion: [{ value: this.data.descripcion, disabled: true }],
      monto: [{ value: this.data.monto, disabled: true }],
    });
  }
  
  getList(id : number) {
    this.solicitudService.detailsGet(id).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaSolicitud = data.map((solicitudes) => ({
            ...solicitudes,          
          }));
        }
      },
      error: (err) => {
        console.log(err + 'error');
      },
    });
  }
  eliminarSolicitud() {
    const solicitud = this.data;
  
    this.solicitudService.deleteDel(solicitud).subscribe({
      next: () => {
        alert('Solicitud eliminada correctamente.');
        this.dialogRef.close('success');
      },
      error: (err) => {
        console.error(err);
        alert('Error al eliminar la solicitud.');
        this.dialogRef.close('error');
      },
    });
  }
  
  

  onCancel() {
    this.dialogRef.close();
  }
}
