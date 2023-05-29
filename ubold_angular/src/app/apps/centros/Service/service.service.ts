import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Centro, Municipio } from '../Models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  variableGlobal: string = environment.variableGlobal;

  getCentros(){
    return this.http.get<Centro[]>(`${this.variableGlobal}Centros/Listado`);
  }
  deleteCentros(id: number){
    return this.http.put(`${this.variableGlobal}Centros/Eliminar?id=${id}`, null);
  }
  editCentros(editCentros: Centro){
    return this.http.put<Centro[]>(`${this.variableGlobal}Centros/Editar`, editCentros);
  }

  addCentros(newCentro: Centro){
    return this.http.post<Centro[]>(`${this.variableGlobal}Centros/Insertar`, newCentro);
  }
  getMunicipios(){
    return this.http.get<Municipio[]>(`${this.variableGlobal}Municipios/Listado?depa=0`);
  }
  
}
