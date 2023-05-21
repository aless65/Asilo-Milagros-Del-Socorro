import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Enfermedad } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  Url="http://asilomilagrosdelsocorro.somee.com/api/";

  getEnfermedades(){
    return this.http.get<Enfermedad[]>(`${this.Url}Enfermedades/Listado`);
  }
  
  addEnfermedades(newEnfermedad: Enfermedad){
    return this.http.post<Enfermedad[]>(`${this.Url}Enfermedades/Insertar`, newEnfermedad);
  }
}
