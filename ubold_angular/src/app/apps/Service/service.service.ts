import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { EstadoCivil } from '../Models';
import {Cargos} from '../Models';
import {Centros} from '../Models';
import { Municipio } from '../Models';
import { environment } from 'src/environments/environment'; //importar la variable global

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }

  getEstadosCiviles(){
    return this.http.get<EstadoCivil[]>(`${this.variableGlobal}EstadosCiviles/Listado`);
  }
  
  getCargos(){
    return this.http.get<Cargos[]>(`${this.variableGlobal}Cargos/Listado`);
  }

  getCentros(){
    return this.http.get<Centros[]>(`${this.variableGlobal}Centros/Listado`);
  }
  
  getMunicipios(){
    return this.http.get<Municipio[]>(`${this.variableGlobal}Municipios/Listado?depa=0`);
  }
}
