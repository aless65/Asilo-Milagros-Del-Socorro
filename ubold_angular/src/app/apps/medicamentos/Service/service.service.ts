import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Medicamentos } from '../Models';
import { environment } from 'src/environments/environment'; //importar la variable global
import { Proveedor } from '../../proveedores/Model';
import { Centro } from '../../centros/Models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  variableGlobal: string = environment.variableGlobal;
  constructor(private http:HttpClient) { }

  getMedicamentos(){
    return this.http.get<Medicamentos[]>(`${this.variableGlobal}Medicamentos/Listado`);
  }
  addMedicamentos(newMedicamento: Medicamentos){
    return this.http.post<Medicamentos[]>(`${this.variableGlobal}Medicamentos/Insertar`, newMedicamento);
  }
  
  editMedicamentos(editMedicamento: Medicamentos){
    return this.http.put<Medicamentos[]>(`${this.variableGlobal}Medicamentos/Editar`, editMedicamento);
  }

  deleteMedicamento(id: number){
    return this.http.put(`${this.variableGlobal}Medicamentos/Eliminar?id=${id}`, null);
  }

  
  getProveedor(){
    return this.http.get<Proveedor[]>(`${this.variableGlobal}Proveedores/Listado/Listado`);
  }
  
  getCentros(){
    return this.http.get<Centro[]>(`${this.variableGlobal}Centros/Listado`);
  }
}
