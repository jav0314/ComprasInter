import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { connectionAPI } from '../appsettings';
import { Solicitud } from '../models/solicitudes';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesServices {
  private http = inject(HttpClient);
  public apiLink = connectionAPI.apiURL + 'usuario';
  public apiLinkSupervisor = connectionAPI.apiURL + 'supervisor';
  constructor() {}

  detailsGet(idUsuario: number) {
    const url = `${this.apiLink}/solicitudes/${idUsuario}`;
    return this.http.get<Solicitud[]>(url);
  }
  createPost(solicitud: Solicitud) {
    const url = `${this.apiLink}/solicitudes`;
    return this.http.post<any>(url, solicitud);
  }
    editPut(solicitud: Solicitud) {
    const url = `${this.apiLink}/solicitudes/${solicitud.idSolicitud}`;
    return this.http.put<any>(url, solicitud);
    }

  deleteDel(solicitud: Solicitud) {
    const url = `${this.apiLink}/solicitudes/${solicitud.idSolicitud}?idUsuario=${solicitud.idUsuario}`;
    return this.http.delete<any>(url);
  }
  getSolicitudesPendientes() {
    const url = `${this.apiLinkSupervisor}/solicitudes`;
    return this.http.get<Solicitud[]>(`${url}`);
  }
  
  aprobarSolicitud(solicitud: Solicitud) {
    const url = `${this.apiLinkSupervisor}/solicitudes/${solicitud.idSolicitud}/aprobar`;
    return this.http.put<any>(url, solicitud);
  }
  
  rechazarSolicitud(solicitud: Solicitud) {
    const url = `${this.apiLinkSupervisor}/solicitudes/${solicitud.idSolicitud}/rechazar`;
    return this.http.put<any>(url, solicitud);
  }
  
  getSolicitudesAprobadas() {
    const url = `${this.apiLinkSupervisor}/solicitudes/solicitudes/aprobadas`;
    return this.http.get<Solicitud[]>(url);
  }
  
  
 
}
