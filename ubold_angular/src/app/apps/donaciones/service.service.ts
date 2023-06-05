import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Donaciones, DonacionesDetalles, Centro } from '../donaciones/Model';
import { environment } from 'src/environments/environment';  //importar la variable global



@Injectable({
  providedIn: 'root'
})
export class ServiceD {

  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }

  getDonacion(){
    return this.http.get<Donaciones[]>(`${this.variableGlobal}Donaciones/Listado`); 
  }

  
  getDonacionCOMUN(){
    return this.http.get<Donaciones[]>(`${this.variableGlobal}Donaciones/ListadoDonacionesComunes`); 
  }
  
  createDonacion(newDonacion: Donaciones){
    return this.http.post<Donaciones[]>(`${this.variableGlobal}Donaciones/Insertar`, newDonacion);
  }

   createDonacionDetail(newDonacion: DonacionesDetalles){
    return this.http.post<DonacionesDetalles[]>(`${this.variableGlobal}Donaciones/InsertarDetails`, newDonacion);
  }

  createDonacionDetailDesc(newDonacion: DonacionesDetalles){
    return this.http.post<DonacionesDetalles[]>(`${this.variableGlobal}Donaciones/InsertarDetailsDescrp`, newDonacion);
  }


  

  //insumos que lleva
  getDonacionId(id?: number){
    return this.http.get<DonacionesDetalles[]>(`${this.variableGlobal}Donaciones/FindDetalles?id=`+id); 
  }

  getDonacionCentros(id?: number){
    return this.http.get<Centro[]>(`${this.variableGlobal}Donaciones/DonacionesCentros?id=`+id); 
  }

  findDonacionId(id?: number){
    return this.http.get<Donaciones[]>(`${this.variableGlobal}Donaciones/Find?id=`+id); 
  }


  deleteDonacionesDetails(id: number){
    return this.http.put(`${this.variableGlobal}Donaciones/EliminaDetailr?id=${id}`, null);
  }

  
  editarDonacion(newDonacion: Donaciones){
    return this.http.put<Donaciones[]>(`${this.variableGlobal}Donaciones/Editar`, newDonacion);
  }

  deleteDonaciones(id: number){
    return this.http.put(`${this.variableGlobal}Donaciones/Eliminar?id=${id}`, null);
  }
  

}
