import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Encargado } from '../encargados/Model';
import { environment } from 'src/environments/environment'; //importar la variable global

@Injectable({
  providedIn: 'root'
})

export class ServiceServiceE {
  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }

  getEncargados(){
    return this.http.get<Encargado[]>(`${this.variableGlobal}Encargados/Listado`); 
  }
  
  createEncargados(newEncargados: Encargado){
    newEncargados.enca_UsuCreacion = 1;
    return this.http.post<Encargado[]>(`${this.variableGlobal}Encargados/Insertar`, newEncargados);
  }


  getEncargadosId(id2?: number){
    return this.http.get<Encargado[]>(`${this.variableGlobal}Encargados/Find?id=`+id2); 
  }
  
  editarEncargados(newEncargados: Encargado){
    newEncargados.enca_UsuModificacion = 1;
    return this.http.put<Encargado[]>(`${this.variableGlobal}Encargados/Editar`, newEncargados);
  }

  deleteEncargadoss(id: number){
    return this.http.put(`${this.variableGlobal}Encargados/Eliminar?id=${id}`, null);
  }
}
