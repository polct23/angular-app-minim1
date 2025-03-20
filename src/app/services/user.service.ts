import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:4000/api/users";

  getUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(this.apiUrl).pipe(
      map(response => response.data) // Extrae el array 'data'
    );
  }

  //No s'utilitza però es pot fer servir per obtenir un usuari en concret a partir de la seva id
  getUser(id: number): Observable<User>{
    return this.http.get<User>(this.apiUrl+"/"+id);
  }


   createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }


  createUser2(credentials: { name: string; email: string; password: string; phone: string; available: boolean; packets: string[] }): Observable<any> 
  {
    credentials.available = true;
    console.log("credentials:",credentials);
    return this.http.post(this.apiUrl, credentials);
  }
  createUser3(credentials: { name: string; email: string; password: string; phone: string; packets: string[] }): Observable<any>
  {
    return this.http.post(this.apiUrl, credentials);
  }
  
  deleteUsuario(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`); // Llamada DELETE para eliminar un usuario
  }
  deactivateUsuario(id: number, user:User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {user}); // Llamada PUT para desactivar un usuario
  }
  
  

}
