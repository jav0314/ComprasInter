import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
// import { DetailsComponent } from '../../dialog/details/details.component';
 import { EditComponent } from '../../dialog/edit/edit.component';
// import { NewpostComponent } from '../../dialog/newpost/newpost.component';
// import { DeleteComponent } from '../../dialog/delete/delete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Solicitud } from '../../models/solicitudes';
import { SolicitudesServices } from '../../services/solicitudes.service';
import { NewpostComponent } from '../../dialog/newpost/newpost.component';
import { DeleteComponent } from '../../dialog/delete/delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    // NumberDirective,
    // TextDirective,
    // disableInputDirective,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  private solicitudService = inject(SolicitudesServices);
  public listaSolicitud: Solicitud[] = [];
  public displayedColumns: string[] = [
    'idSolicitud',
    'idUsuario',
    'descripcion',
    'monto',
    'fechaEsperada',
    'estadoSolicitud',
    'comentario',
    'action',
  ];
  
 
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.getList(1);
  }
  irASupervisor() {
    this.router.navigate(['/supervisor']);
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

  editSolicitud(id: number) {
    const solicitud = this.listaSolicitud.find((s) => s.idSolicitud === id);
  
    if (solicitud) {
      this.dialog
      .open(EditComponent, {
        data: solicitud,
      })
        .afterClosed()
        .subscribe((result) => {
          if (result === 'success') {
            this.getList(1); 
          }
        });
    }
  }


  deletePerson(id: number) {
    const person = this.listaSolicitud.find((p) => p.idSolicitud === id);
    if (person) {
      this.dialog
        .open(DeleteComponent, {
          data: person,
        })
        .afterClosed()
        .subscribe((result) => {
          this.getList(1);
        });
    }
  }

  openNewPostDialog(): void {
    const dialogRef = this.dialog.open(NewpostComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getList(1);
      }
      this.getList(1);
    });
  }


}
