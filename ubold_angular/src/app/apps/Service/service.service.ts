import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { EstadoCivil, TipoSangre, 
         Enfermedad, Municipio,
         Parentesco, Centro,
         Actividad, Medicamento,
         Cargos, Habitacion,
         MetodoPago } from '../Models';
import { environment } from 'src/environments/environment';
import { Empleados } from '../empleados/Model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }

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
  }
  
  getCargos(){
    return this.http.get<Cargos[]>(`${this.variableGlobal}Cargos/Listado`);
  }
  
  getCuidadoresDisponibles(id: number){
    return this.http.get<Empleados[]>(`${this.variableGlobal}Empleados/CuidadoresDisponibles?cent_Id=${id}`);
  }
  
  getHabitacionesDisponibles(id: number){
    return this.http.get<Habitacion[]>(`${this.variableGlobal}Habitaciones/HabitacionesDisponibles?cent_Id=${id}`);
  }
  
  getMetodosPago(){
    return this.http.get<MetodoPago[]>(`${this.variableGlobal}MetodosPago/Listado`);
  }
}
