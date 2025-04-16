import { Component, inject, OnInit } from '@angular/core';
import { SolicitudesServices } from '../../services/solicitudes.service';
import { MatDialog } from '@angular/material/dialog';
import { Solicitud } from '../../models/solicitudes';
import { AprobarRechazarComponent } from '../aprobar-rechazar/aprobar-rechazar.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrl: './supervisor.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SupervisorComponent implements OnInit {
  solicitudesPendientes: Solicitud[] = [];
  aprobadas: Solicitud[] = [];
  solicitudesService = inject(SolicitudesServices);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.cargarSolicitudesPendientes();
    this.cargarSolicitudesAprobadas();
  }

  cargarSolicitudesPendientes() {
    this.solicitudesService.getSolicitudesPendientes().subscribe((data) => {
      this.solicitudesPendientes = data;
    });
  }
  cargarSolicitudesAprobadas() {
    this.solicitudesService.getSolicitudesAprobadas().subscribe(data => {
      this.aprobadas = data;
    });
  }
  abrirModalAprobarRechazar(solicitud: Solicitud) {
    const dialogRef = this.dialog.open(AprobarRechazarComponent, {
      width: '500px',
      data: solicitud,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.cargarSolicitudesPendientes();
        this.cargarSolicitudesAprobadas();
      }
    });
  }
}
