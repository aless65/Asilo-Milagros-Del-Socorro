import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Muerto, Residente } from '../../Models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  
  variableGlobal: string = environment.variableGlobal;

  getMuertos(){
    return this.http.get<Muerto[]>(`${this.variableGlobal}Muertos/Listado`);
  }
  
  addMuertos(newMuerto: Muerto){
    return this.http.post<Muerto[]>(`${this.variableGlobal}Muertos/Insertar`, newMuerto);
  }
  
  editMuertos(editMuerto: Muerto){
    return this.http.put<Muerto[]>(`${this.variableGlobal}Muertos/Editar`, editMuerto);
  }

  deleteMuertos(id: number){
    return this.http.put(`${this.variableGlobal}Muertos/Eliminar?id=${id}`, null);
  }

  getResidentes(){
    return this.http.get<Residente[]>(`${this.variableGlobal}Residentes/Listado`);
  
  }
}
