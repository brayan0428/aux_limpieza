import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  //private url:string = 'https://api-aux-limpieza.herokuapp.com'
  private url:string = 'http://localhost:3000'
  constructor(private http:HttpClient) { }

  obtenerCiudades(){
    return this.http.get(`${this.url}/ciudades`)
  }

  validarLogin(user){
    return this.http.post(`${this.url}/usuario`,user)
  }

}
