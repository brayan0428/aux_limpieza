import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-solicitud-servicio",
  templateUrl: "./solicitud-servicio.page.html",
  styleUrls: ["./solicitud-servicio.page.scss"]
})
export class SolicitudServicioPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  solicitarServicio(form) {
    console.log(form);
  }
}
