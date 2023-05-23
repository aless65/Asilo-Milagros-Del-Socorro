import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Residente } from '../../Models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  Url="http://asilomilagrosdelsocorro.somee.com/api/";

  getResidentes(){
    return this.http.get<Residente[]>(`${this.Url}Residentes/Listado`);
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
