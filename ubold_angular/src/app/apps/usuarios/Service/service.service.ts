import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Usuario } from '../Models';
import { environment } from 'src/environments/environment'; //importar la variable global

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceU {
  constructor(private http:HttpClient) { }
  variableGlobal: string = environment.variableGlobal;

  getUsuarios(){
    return this.http.get<Usuario[]>(`${this.variableGlobal}Usuario/Listado`);
  }
 
  addUsuarios(newUsuario: Usuario){
    return this.http.post<Usuario[]>(`${this.variableGlobal}Usuario/Insertar`, newUsuario);
  }
  
  editUsuarios(editUsuario: Usuario){
    return this.http.put<Usuario[]>(`${this.variableGlobal}Usuario/Editar`, editUsuario);
  }

  deleteUsuarios(id: number){
    return this.http.put(`${this.variableGlobal}Usuario/Eliminar?id=${id}`, null);
  }
  
}
