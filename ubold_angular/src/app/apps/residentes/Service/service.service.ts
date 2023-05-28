import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Residente, AgendaDetalle } from '../../Models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  
  variableGlobal: string = environment.variableGlobal;

  getResidentes(){
    return this.http.get<Residente[]>(`${this.variableGlobal}Residentes/Listado`);
  }

  getAgendaDetalles(id: number){
    return this.http.get<AgendaDetalle[]>(`${this.variableGlobal}Agenda/ListadoDetalles?id=${id}`);
  }
  
  
//   addEnfermedades(newEnfermedad: Enfermedad){
//     return this.http.post<Enfermedad[]>(`${this.Url}Enfermedades/Insertar`, newEnfermedad);
//   }
  
//   editEnfermedades(editEnfermedad: Enfermedad){
//     return this.http.put<Enfermedad[]>(`${this.Url}Enfermedades/Editar`, editEnfermedad);
//   }

//   deleteEnfermedades(id: number){
//     return this.http.put(`${this.Url}Enfermedades/Eliminar?id=${id}`, null);
//   }
}
