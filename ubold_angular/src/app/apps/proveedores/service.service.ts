import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Proveedor } from '../proveedores/Model';
import { environment } from 'src/environments/environment'; //importar la variable global


@Injectable({
  providedIn: 'root'
})
export class ServiceServiceP {
  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }

  getProveedor(){
    return this.http.get<Proveedor[]>(`${this.variableGlobal}Proveedores/Listado`); //la usamos aqui
  }
  
  createProveedor(newProveedor: Proveedor){
    newProveedor.prov_UsuCreacion = 1;
    return this.http.post<Proveedor[]>(`${this.variableGlobal}Proveedores/Insertar`, newProveedor);
  }


  getProveedorId(id?: number){
    return this.http.get<Proveedor[]>(`${this.variableGlobal}Proveedores/Find?id=`+id); 
  }
  
  editarProveedor(newProveedor: Proveedor){
    newProveedor.prov_UsuModificacion = 1;
    return this.http.put<Proveedor[]>(`${this.variableGlobal}Proveedores/Editar`, newProveedor);
  }

  deleteProveedores(id: number){
    return this.http.put(`${this.variableGlobal}Proveedores/Eliminar?id=${id}`, null);
  }
}