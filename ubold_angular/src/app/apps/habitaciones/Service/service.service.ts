import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Habitacion } from '../Models';
import { environment } from 'src/environments/environment'; //importar la variable global

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceH {
  
  variableGlobal: string = environment.variableGlobal;
  constructor(private http:HttpClient) { }

  getHabitaciones(){
    return this.http.get<Habitacion[]>(`${this.variableGlobal}Habitaciones/Listado`);
  }
  addHabitaciones(newhabitacion: Habitacion){
    return this.http.post<Habitacion[]>(`${this.variableGlobal}Habitaciones/Insertar`, newhabitacion);
  }
  
  editHabitaciones(editHabitacion: Habitacion){
    return this.http.put<Habitacion[]>(`${this.variableGlobal}Habitaciones/Editar`, editHabitacion);
  }

  deleteHabitaciones(id: number){
    return this.http.put(`${this.variableGlobal}Habitaciones/Eliminar?id=${id}`, null);
  }
  
}
