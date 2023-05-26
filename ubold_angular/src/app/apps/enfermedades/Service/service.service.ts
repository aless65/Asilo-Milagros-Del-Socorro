import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Enfermedad } from '../../Models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  
  variableGlobal: string = environment.variableGlobal;

  getEnfermedades(){
    return this.http.get<Enfermedad[]>(`${this.variableGlobal}Enfermedades/Listado`);
  }
  
  addEnfermedades(newEnfermedad: Enfermedad){
    return this.http.post<Enfermedad[]>(`${this.variableGlobal}Enfermedades/Insertar`, newEnfermedad);
  }
  
  editEnfermedades(editEnfermedad: Enfermedad){
    return this.http.put<Enfermedad[]>(`${this.variableGlobal}Enfermedades/Editar`, editEnfermedad);
  }

  deleteEnfermedades(id: number){
    return this.http.put(`${this.variableGlobal}Enfermedades/Eliminar?id=${id}`, null);
  }
}
