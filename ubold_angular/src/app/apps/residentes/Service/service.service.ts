import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Residente, AgendaDetalle } from '../../Models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }

  headers!: {
    'Content-Type' : 'multipart/form-data; charset=UTF-8'
  }

  variableGlobal: string = environment.variableGlobal;

  variableAPIimg: string = environment.imgAPI;

  getResidentes() {
    return this.http.get<Residente[]>(`${this.variableGlobal}Residentes/Listado`);
  }

  getAgendaDetalles(id: number) {
    return this.http.get<AgendaDetalle[]>(`${this.variableGlobal}Agenda/ListadoDetalles?id=${id}`);
  }

  getImageUpload(img: string) {
    const headers = new HttpHeaders();
    headers.delete('Content-Type');
    

    // fetch(`${this.variableAPIimg}https://i.ytimg.com/vi/SNnrUGPIcew/maxresdefault.jpg`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   // body: JSON.stringify(data)
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Error en la solicitud');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     // Manejar la respuesta exitosa
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     // Manejar el error
    //     console.error(error);
    //   });

    return this.http.post<any>(`${this.variableAPIimg}https://i.ytimg.com/vi/SNnrUGPIcew/maxresdefault.jpg`, { headers: headers }).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  //   addEnfermedades(newEnfermedad: Enfermedad){
  //     return this.http.post<Enfermedad[]>(`${this.Url}Enfermedades/Insertar`, newEnfermedad);
  //   }

  //   editEnfermedades(editEnfermedad: Enfermedad){
  //     return this.http.put<Enfermedad[]>(`${this.Url}Enfermedades/Editar`, editEnfermedad);
  //   }

  //   deleteEnfermedades(id: number){
  //     return this.http.put(`${this.Url}Enfermedades/Eliminar?id=${id}`, null);
  //   }
}
