import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL_API} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {
  
  private url:string = URL_API

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
