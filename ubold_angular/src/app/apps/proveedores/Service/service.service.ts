import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Proveedor } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  Url="http://asilomilagrosdelsocorro.somee.com/api/";

  getProveedores(){
    return this.http.get<Proveedor[]>(`${this.Url}Proveedores/Listado`);
  }
  
  addProveedores(newProveedor: Proveedor){
    return this.http.post<Proveedor[]>(`${this.Url}Proveedores/Insertar`, newProveedor);
  }
}
