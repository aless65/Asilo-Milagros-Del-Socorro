import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Usuario } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  Url="https://localhost:44371/api/";

  getUsuarios(){
    return this.http.get<Usuario[]>(`${this.Url}Usuario/Listado`);
  }
  
}
