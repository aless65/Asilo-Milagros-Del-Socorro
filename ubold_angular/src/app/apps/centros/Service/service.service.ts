import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Centro } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }

  Url="https://localhost:44371/api/";

  getCentros(){
    return this.http.get<Centro[]>(`${this.Url}Centros/Listado`);
  }
  
}
