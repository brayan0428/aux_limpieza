import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public static loggedUser:boolean = false;
  public static idUser: string;
  public static nombresUser:string;
  public static apellidosUser:string;
  public static correoUser:string;
  
  constructor() {}
}
