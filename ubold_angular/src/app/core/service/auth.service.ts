import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/auth.models';


import {Usuario} from 'src/app/apps/usuarios/Models';
import { environment } from 'src/environments/environment'; //importar la variable global

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    variableGlobal: string = environment.variableGlobal;
    user: Usuario | null = null;
   /* user: User | null = null;*/
    


    constructor (private http: HttpClient) {
    }


   public currentUser(): Usuario | null {
        if (!this.user) {
            this.user = JSON.parse(localStorage.getItem('currentUser')!);
        }
        return this.user;
    }

    
    /**
     * Performs the login auth
     * @param email email of user
     * @param password password of user
     */
        login(email: string, password: string): any {

            return this.http.post<any>(`/api/login`, { email, password })
                .pipe(map(user => {
                    // login successful if there's a jwt token in the response
                    if (user && user.token) {
                        this.user = user;
                        // store user details and jwt in session
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    return user;
                }));
        }


   
        /**
     * Performs the login auth
     * @param username email of user
     * @param contra password of user
     */  
    
        LoginPrueba(username?: string, contra?: string) {
            return this.http.get<Usuario[]>(`${this.variableGlobal}Usuario/Login?usuario=${username}&contrasena=${contra}`)
          
            .pipe(map(user => {           
                localStorage.setItem('currentUser', JSON.stringify(user));
            
                    return user;
            }));

          }


    /**
     * Performs the signup auth
     * @param name name of user
     * @param email email of user
     * @param password password of user
     */
    signup(name: string, email: string, password: string): any {
        return this.http.post<any>(`/api/signup`, { name, email, password })
            .pipe(map(user => user));

    }



    /**
     * Logout the user
     */
    logout(): void {
        // remove user from session storage to log user out
        localStorage.removeItem('currentUser');
        this.user = null;
    }
}