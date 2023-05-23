import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Cargo } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  Url="https://localhost:44371/api/";

  getCargos(){
    return this.http.get<Cargo[]>(`${this.Url}Cargos/Listado`);
  }
  
}
