import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
  
  private url:string = 'https://api-auxlimpieza.herokuapp.com'
  //private url:string = 'http://localhost:3001'

  constructor(private http:HttpClient) { }

  guardarUsuario(user){
    return this.http.post(`${this.url}/usuarionuevo`, user)
  }

  guardarProveedor(proveedor){
    return this.http.post(`${this.url}/proveedores`, proveedor)
  }

  guardarServicio(servicio){
    return this.http.post(`${this.url}/servicio`, servicio)
  }
}
