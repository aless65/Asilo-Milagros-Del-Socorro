import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Empleados } from '../empleados/Model';
import { environment } from 'src/environments/environment'; //importar la variable global


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }

 /* Url="http://asilomilagrosdelsocorro.somee.com/api/";*/ //ya no se ocupa

  getEnfermedades(){
    return this.http.get<Empleados[]>(`${this.variableGlobal}Empleados/Listado`); //la usamos aqui
  }
  
  addEnfermedades(newEnfermedad: Empleados){
    return this.http.post<Empleados[]>(`${this.variableGlobal}Enfermedades/Insertar`, newEnfermedad);
  }
}
