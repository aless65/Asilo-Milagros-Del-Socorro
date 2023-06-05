import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { EstadoCivil, TipoSangre, 
         Enfermedad, Municipio,
         Parentesco, Centro,
         Actividad, Medicamento,
         Cargos, Centros, Residente,
         Habitacion, MetodoPago, Categoria,Rol,Usuario } from '../Models';
import { environment } from 'src/environments/environment';
import { Empleados } from '../empleados/Model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }

  getRol(){
    return this.http.get<Rol[]>(`${this.variableGlobal}Roles/Listado`);
  }
  getUsuarios(){
    return this.http.get<Usuario[]>(`${this.variableGlobal}Usuario/Listado`);
  }
  addUsuarios(newUsuario: Usuario){
    return this.http.post<Usuario[]>(`${this.variableGlobal}Usuario/Insertar`, newUsuario);
  }
  
  editUsuarios(editUsuario: Usuario){
    return this.http.put<Usuario[]>(`${this.variableGlobal}Usuario/Editar`, editUsuario);
  }

  deleteUsuarios(id: number){
    return this.http.put(`${this.variableGlobal}Usuario/Eliminar?id=${id}`, null);
  }

  
  getEmpleado(){
    return this.http.get<Empleados[]>(`${this.variableGlobal}Empleados/Listado`);
  }

  getEstadosCiviles(){
    return this.http.get<EstadoCivil[]>(`${this.variableGlobal}EstadosCiviles/Listado`);
  }

  getTiposSangre(){
    return this.http.get<TipoSangre[]>(`${this.variableGlobal}TiposSangre/Listado`);
  }
  
  getEnfermedades(){
    return this.http.get<Enfermedad[]>(`${this.variableGlobal}Enfermedades/Listado`);
  }
  
 /* getMunicipios(){
    return this.http.get<Municipio[]>(`http://asilomilagrosdelsocorro.somee.com/api/Municipios/Listado?depa=0`);
  }*/
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

  getResidentes(){
    return this.http.get<Residente[]>(`${this.variableGlobal}Residentes/Listado`);
  
  }
  
  getCuidadoresDisponibles(centro: number, residente: number){
    return this.http.get<Empleados[]>(`${this.variableGlobal}Empleados/CuidadoresDisponibles?cent_Id=${centro}&resi_Id=${residente}`);
  }
  
  getHabitacionesDisponibles(centro: number, residente: number){
    return this.http.get<Habitacion[]>(`${this.variableGlobal}Habitaciones/HabitacionesDisponibles?cent_Id=${centro}&resi_Id=${residente}`);
  }
  
  getMetodosPago(){
    return this.http.get<MetodoPago[]>(`${this.variableGlobal}MetodosPago/Listado`);
  }

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

  getCategoria(){
    return this.http.get<Categoria[]>(`${this.variableGlobal}CategoriasHabitaciones/Listado`);
  }

  getGrafica(){
    return this.http.get<any>(`https://localhost:44371/api/Centros/Grafica`);
  }
  
}
