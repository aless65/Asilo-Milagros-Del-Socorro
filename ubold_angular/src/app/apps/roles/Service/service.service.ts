import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Rol } from '../../Models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  
  variableGlobal: string = environment.variableGlobal;

  getRoles(){
    return this.http.get<Rol[]>(`${this.variableGlobal}Roles/Listado`);
  }
  
  addRoles(newRol: Rol){
    return this.http.post<Rol[]>(`${this.variableGlobal}Roles/Insertar`, newRol);
  }
  
  editRoles(editRol: Rol){
    return this.http.put<Rol[]>(`${this.variableGlobal}Roles/Editar`, editRol);
  }

  deleteRoles(id: number){
    return this.http.put(`${this.variableGlobal}Roles/Eliminar?id=${id}`, null);
  }
}
