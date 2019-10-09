import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
  
  private url:string = 'https://api-aux-limpieza.herokuapp.com'
  
  constructor(private http:HttpClient) { }

  guardarUsuario(user){
    return this.http.post(`${this.url}/usuarionuevo`, user)
  }
}
