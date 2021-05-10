import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_API } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ConsultasService {
  private url: string = URL_API;
  constructor(private http: HttpClient) {}

  obtenerCiudades() {
    return this.http.get(`${this.url}/ciudades`);
  }

  validarLogin(user) {
    return this.http.post(`${this.url}/usuario`, user);
  }

  obtenerServicios() {
    return this.http.get(`${this.url}/servicios`);
  }

  obtenerGruposEspecialidades() {
    return this.http.get(`${this.url}/grupos`);
  }

  obtenerEspecialidadesxGrupo(id: string) {
    return this.http.get(`${this.url}/servicios-especiales/${id}`);
  }

  obtenerEspecialidadesxGrupoTodos(id: string) {
    return this.http.get(`${this.url}/servicios-especiales-todos/${id}`);
  }

  obtenerValorServicio(data) {
    return this.http.post(`${this.url}/valorservicio`, data);
  }

  obtenerUsuariosAsociados(id) {
    return this.http.get(`${this.url}/usuarios-asociados/${id}`);
  }

  obtenerTiposDocumentos() {
    return this.http.get(`${this.url}/tipodoc`);
  }

  obtenerProveedores(id) {
    return this.http.get(`${this.url}/proveedores/${id}`);
  }

  obtenerFestivos() {
    return this.http.get(`${this.url}/festivos`);
  }

  olvidoContrasena(data) {
    return this.http.post(`${this.url}/olvido-contrasena`, data);
  }

  obtenerServiciosxUsuario(id) {
    return this.http.get(`${this.url}/serviciosxusuario/${id}`);
  }

  obtenerUsuario(id) {
    return this.http.get(`${this.url}/usuario/${id}`);
  }
}
