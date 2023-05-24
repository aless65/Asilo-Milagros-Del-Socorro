import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Cargo } from '../Models';
import { environment } from 'src/environments/environment'; //importar la variable global

@Injectable({
  providedIn: 'root'
})
export class ServiceService { 
  variableGlobal: string = environment.variableGlobal;
  constructor(private http:HttpClient) { }

  getCargos(){
    return this.http.get<Cargo[]>(`${this.variableGlobal}Cargos/Listado`);
  }
  
}
