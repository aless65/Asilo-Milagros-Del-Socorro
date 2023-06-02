import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../shared/models/menu.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    constructor(private http: HttpClient) {}

    getMenuItems(isAdmin: boolean, roleId: number): Observable<MenuItem[]> {
        const apiUrl = `https://localhost:44371/api/Pantallas/ListadoMenu?esAdmin=${isAdmin}&role_Id=${roleId}`;
        return this.http.get<MenuItem[]>(apiUrl);
    }
}

