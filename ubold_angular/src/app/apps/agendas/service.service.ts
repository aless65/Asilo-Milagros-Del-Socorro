import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Agenda, AgendaDetalle } from '../Models';
import { environment } from 'src/environments/environment'; //importar la variable global


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }

  getAgendas(){
    return this.http.get<Agenda[]>(`${this.variableGlobal}Agenda/Listado`); //la usamos aqui
  }

  deleteAgenda(id: number){
    return this.http.put<any>(`${this.variableGlobal}Agenda/Eliminar?id=${id}`, null); //la usamos aqui
  }
  
  getAgendaDetalles(id: number){
    return this.http.get<AgendaDetalle[]>(`${this.variableGlobal}Agenda/ListadoDetalles?id=${id}`); //la usamos aqui
  }
  
  addAgendaDetalles(detalle: AgendaDetalle[]){
    return this.http.post<any>(`${this.variableGlobal}Agenda/InsertarDetalles`, detalle); //la usamos aqui
  }
//   createEmpleado(newEmpleado: Empleados){
//     newEmpleado.empe_UsuCreacion = 1;
//     return this.http.post<Empleados[]>(`${this.variableGlobal}Empleados/Insertar`, newEmpleado);
//   }


//   getEmpleadoId(id?: number){
//     return this.http.get<Empleados[]>(`${this.variableGlobal}Empleados/Find?id=`+id); 
//   }
  
//   editarEmpleado(newEmpleado: Empleados){
//     newEmpleado.empe_UsuModificacion = 1;
//     return this.http.put<Empleados[]>(`${this.variableGlobal}Empleados/Editar`, newEmpleado);
//   }

//   deleteEmpleados(id: number){
//     return this.http.put(`${this.variableGlobal}Empleados/Eliminar?id=${id}`, null);
//   }
}