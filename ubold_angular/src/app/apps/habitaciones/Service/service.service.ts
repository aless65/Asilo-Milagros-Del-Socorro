import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Habitacion } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  Url="https://localhost:44371/api/";

  getHabitaciones(){
    return this.http.get<Habitacion[]>(`${this.Url}Habitaciones/Listado`);
  }
  
}
