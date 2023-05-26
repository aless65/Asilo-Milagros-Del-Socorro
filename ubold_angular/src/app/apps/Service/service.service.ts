import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
<<<<<<< HEAD
import { EstadoCivil, TipoSangre, 
         Enfermedad, Municipio,
         Parentesco, Centro,
         Actividad, Medicamento } from '../Models';
import { environment } from 'src/environments/environment';
=======
import { EstadoCivil } from '../Models';
import {Cargos} from '../Models';
import {Centros} from '../Models';
import { Municipio } from '../Models';
import { environment } from 'src/environments/environment'; //importar la variable global
>>>>>>> Meow

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }
<<<<<<< HEAD
  
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

  getCentros(){
    return this.http.get<Centro[]>(`${this.variableGlobal}Centros/Listado`);
  }

  getActividades(){
    return this.http.get<Actividad[]>(`${this.variableGlobal}Actividades/Listado`);
  }

  getMedicamentos(){
    return this.http.get<Medicamento[]>(`${this.variableGlobal}Medicamentos/Listado`);
=======

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
>>>>>>> Meow
  }
}
