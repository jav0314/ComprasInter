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
  constructor() {}

  detailsGet(idUsuario: number) {
    const url = `${this.apiLink}/solicitudes/${idUsuario}`;
    return this.http.get<Solicitud[]>(url);
  }
  createPost(solicitud: Solicitud) {
    const url = `${this.apiLink}/solicitudes`;
    return this.http.post<any>(url, solicitud);
  }
  /* detailsByIdGet(id: number) {
    return this.http.get<Person>(`${this.apiLink}/${id}`);
  }


  deleteDel(id: number) {
    return this.http.delete<any>(`${this.apiLink}/${id}`);
  }

  editPut(person: Person) {
    return this.http.put<any>(`${this.apiLink}/${person.id}`, person);
  }

  filterId(id: number) {
    return this.http.get<Person>(`${this.apiLink}/id/${id}`);
  }

  filterName(name: string) {
    return this.http.get<Person[]>(`${this.apiLink}/name/${name}`);
  }

  filterDate(dateFrom: string, dateTo: string) {
    return this.http.get<Person[]>(
      `${this.apiLink}/date/${dateFrom}/${dateTo}`
    );
  } */
}
