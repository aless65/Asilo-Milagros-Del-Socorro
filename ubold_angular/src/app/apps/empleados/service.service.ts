import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Empleados } from '../empleados/Model';
import { environment } from 'src/environments/environment'; //importar la variable global


@Injectable({
  providedIn: 'root'
})
export class ServiceServiceE {
  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }

  getEnfermedades(){
    return this.http.get<Empleados[]>(`${this.variableGlobal}Empleados/Listado`); //la usamos aqui
  }
  
  createEmpleado(newEmpleado: Empleados){
    newEmpleado.empe_UsuCreacion = 1;
    return this.http.post<Empleados[]>(`${this.variableGlobal}Empleados/Insertar`, newEmpleado);
  }

  
}
