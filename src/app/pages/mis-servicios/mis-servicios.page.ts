import { Component, OnInit } from "@angular/core";
import { ConsultasService } from "src/app/services/consultas.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-mis-servicios",
  templateUrl: "./mis-servicios.page.html",
  styleUrls: ["./mis-servicios.page.scss"],
})
export class MisServiciosPage implements OnInit {
  public servicios = [];

  constructor(private consultasService: ConsultasService) {}

  ngOnInit() {
    this.consultasService
      .obtenerServiciosxUsuario(UserService.idUser)
      .subscribe((data: any) => {
        const res = JSON.parse(data);
        this.servicios = res;
        console.log(res);
      });
  }
}
