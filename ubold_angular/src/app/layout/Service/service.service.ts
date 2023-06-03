import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/layout/shared/models/menu.model';
import { environment } from 'src/environments/environment'; 

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    constructor(private http: HttpClient) {}
    variableGlobal: string = environment.variableGlobal;

    getMenuItems(isAdmin: boolean, roleId: number): Observable<MenuItem[]> {
        const apiUrl = `${this.variableGlobal}Pantallas/ListadoMenu?esAdmin=${isAdmin}&role_Id=${roleId}`;
        return this.http.get<MenuItem[]>(apiUrl);
    }
}

