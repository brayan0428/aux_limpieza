import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-solicitar-servicio",
  templateUrl: "./solicitar-servicio.page.html",
  styleUrls: ["./solicitar-servicio.page.scss"]
})
export class SolicitarServicioPage implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log(UserService.idUser);
  }

  ionViewDidEnter() {}
}
