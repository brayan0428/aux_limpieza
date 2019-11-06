import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ConsultasService {
  private url: string = "https://api-auxlimpieza.herokuapp.com";
  //private url:string = 'http://localhost:3001'
  constructor(private http: HttpClient) {}

  obtenerCiudades() {
    return this.http.get(`${this.url}/ciudades`);
  }

  obtenerEspecialidades() {
    return this.http.get(`${this.url}/especialidades`);
  }

  validarLogin(user) {
    return this.http.post(`${this.url}/usuario`, user);
  }

  obtenerServicios() {
    return this.http.get(`${this.url}/servicios`);
  }

  obtenerGruposEspecialidades() {
    return this.http.get(`${this.url}/grupos-especialidades`);
  }

  obtenerEspecialidadesxGrupo(id: string) {
    return this.http.get(`${this.url}/especialidadesxgrupo/${id}`);
  }
}
