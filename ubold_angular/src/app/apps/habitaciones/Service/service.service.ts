import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Habitacion } from '../Models';
import { environment } from 'src/environments/environment'; //importar la variable global

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  variableGlobal: string = environment.variableGlobal;
  constructor(private http:HttpClient) { }

  getHabitaciones(){
    return this.http.get<Habitacion[]>(`${this.variableGlobal}Habitaciones/Listado`);
  }
  
}
