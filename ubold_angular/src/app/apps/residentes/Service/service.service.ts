import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Residente, AgendaDetalle,
         HistorialExpediente } from '../../Models';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }

  headers!: {
    'Content-Type': 'multipart/form-data; charset=UTF-8'
  }

  variableGlobal: string = environment.variableGlobal;

  variableAPIimg: string = environment.imgAPI;

  getResidentes() {
    return this.http.get<Residente[]>(`${this.variableGlobal}Residentes/Listado`);
  }

  
  findResidentes(id: number) {
    return this.http.get<Residente[]>(`${this.variableGlobal}Residentes/Find?id=${id}`);
  }

  getAgendaDetalles(id: number) {
    return this.http.get<AgendaDetalle[]>(`${this.variableGlobal}Agenda/ListadoDetalles?id=${id}`);
  }

  getImageUpload(img: any) {

    const formData = new FormData();
    formData.append('image', img);
    console.log(formData);

    return this.http.post<any>(`${this.variableAPIimg}`, formData);
  }


  addResidentes(newResidenteForm: any) {
    return this.http.post<any>(`${this.variableGlobal}Residentes/InsertarPrincipal`, newResidenteForm);
  }

  getIdentidadResidenteExiste(identidad: string) {
    return this.http.get<any>(`${this.variableGlobal}Residentes/IdentidadExiste?resi_Identidad=${identidad}`);
  }

  getIdentidadEncargadoExiste(identidad: string) {
    return this.http.get<any>(`${this.variableGlobal}Encargados/IdentidadExiste?enca_Identidad=${identidad}`);
  }

  FindExpediente(id: number) {
    const request1 = this.http.get<Residente>(`${this.variableGlobal}Residentes/Find?id=${id}`);
    const request2 = this.http.get<HistorialExpediente[]>(`${this.variableGlobal}Expedientes/ListadoHistorial?id=${id}`);

    return forkJoin([request1, request2]);
  }

  //   editEnfermedades(editEnfermedad: Enfermedad){
  //     return this.http.put<Enfermedad[]>(`${this.Url}Enfermedades/Editar`, editEnfermedad);
  //   }

  //   deleteEnfermedades(id: number){
  //     return this.http.put(`${this.Url}Enfermedades/Eliminar?id=${id}`, null);
  //   }
}