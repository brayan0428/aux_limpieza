import { Injectable } from "@angular/core";
import { Servicio } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public static loggedUser: boolean = false;
  public static idUser: string;
  public static cedulaUser: string;
  public static ciudadUser: string;
  public static nombresUser: string;
  public static apellidosUser: string;
  public static correoUser: string;
  public static telefonoUser: string;
  public static direccionUser: string;

  public static xServicio: Servicio;

  constructor() {}

  public static CerrarSesion() {
    this.loggedUser = false;
    this.idUser = "";
    this.nombresUser = "";
    this.apellidosUser = "";
    this.correoUser = "";
    this.ciudadUser = "";
    this.direccionUser = "";
    this.telefonoUser = "";
  }
}
