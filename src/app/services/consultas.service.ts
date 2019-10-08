import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  private url:string = 'https://api-aux-limpieza.herokuapp.com'
  constructor(private http:HttpClient) { }

  getCiudades(){
    return this.http.get(`${this.url}/ciudades`)
  }
}
