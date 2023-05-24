import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { EstadoCivil, TipoSangre, Enfermedad, Municipio, Parentesco } from '../Models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  
  variableGlobal: string = environment.variableGlobal;

  getEstadosCiviles(){
    return this.http.get<EstadoCivil[]>(`${this.variableGlobal}EstadosCiviles/Listado`);
  }

  getTiposSangre(){
    return this.http.get<TipoSangre[]>(`${this.variableGlobal}TiposSangre/Listado`);
  }
  
  getEnfermedades(){
    return this.http.get<Enfermedad[]>(`${this.variableGlobal}Enfermedades/Listado`);
  }
  
  getMunicipios(){
    return this.http.get<Municipio[]>(`${this.variableGlobal}Municipios/Listado?depa=0`);
  }
  
  getParentescos(){
    return this.http.get<Parentesco[]>(`${this.variableGlobal}Parentescos/Listado`);
  }
//   addEnfermedades(newEnfermedad: Enfermedad){
//     return this.http.post<Enfermedad[]>(`${this.Url}Enfermedades/Insertar`, newEnfermedad);
//   }
  
//   editEnfermedades(editEnfermedad: Enfermedad){
//     return this.http.put<Enfermedad[]>(`${this.Url}Enfermedades/Editar`, editEnfermedad);
//   }

//   deleteEnfermedades(id: number){
//     return this.http.put(`${this.Url}Enfermedades/Eliminar?id=${id}`, null);
//   }
}