import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Centro } from '../Models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  variableGlobal: string = environment.variableGlobal;

  getCentros(){
    return this.http.get<Centro[]>(`${this.variableGlobal}Centros/Listado`);
  }
  
}
