import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Usuario } from '../Models';
import { environment } from 'src/environments/environment'; //importar la variable global

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  variableGlobal: string = environment.variableGlobal;

  getUsuarios(){
    return this.http.get<Usuario[]>(`${this.variableGlobal}Usuario/Listado`);
  }
  
}
