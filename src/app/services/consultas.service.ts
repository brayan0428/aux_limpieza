import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_API } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class ConsultasService {
  private url: string = URL_API;
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

  obtenerValorServicio(data) {
    return this.http.post(`${this.url}/valorservicio`, data);
  }

  obtenerUsuariosAsociados(id) {
    return this.http.get(`${this.url}/usuarios-asociados/${id}`);
  }
}
