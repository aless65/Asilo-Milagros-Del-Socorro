import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Centro } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  Url="https://localhost:44371/api/";

  getCentros(){
    return this.http.get<Centro[]>(`${this.Url}Centros/Listado`);
  }
  deleteCentros(id: number){
    return this.http.put(`${this.Url}Centros/Eliminar?id=${id}`, null);
  }
  editCentros(editCentros: Centro){
    return this.http.put<Centro[]>(`${this.Url}Centros/Editar`, editCentros);
  }

  addCentros(newCentro: Centro){
    return this.http.post<Centro[]>(`${this.Url}Centros/Insertar`, newCentro);
  }
 
  getMunicipio(){
    return this.http.get<Centro[]>(`${this.Url}Municipios/Listado`);
  }
  getDepartamentos(){
    return this.http.get<Centro[]>(`${this.Url}Deparatmentos/Listado`);
  }
  
}
