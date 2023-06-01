import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Encargado } from '../encargados/Model';
import { environment } from 'src/environments/environment'; //importar la variable global
import { Residente } from './Model';
import { HistorialPago } from './Model';

@Injectable({
  providedIn: 'root'
})

export class ServiceServiceH {
  variableGlobal: string = environment.variableGlobal;

  constructor(private http:HttpClient) { }

  getHistorial(resi_Id: number){
    return this.http.get<HistorialPago[]>(`${this.variableGlobal}HistorialPagos/Find?id=${resi_Id}`); 
  }
  
  getResidentes(){
    return this.http.get<Residente[]>(`${this.variableGlobal}Expedientes/ListadoPagan`);
  }

  
}
