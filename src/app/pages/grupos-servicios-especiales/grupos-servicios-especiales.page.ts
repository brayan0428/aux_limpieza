import { Component, OnInit } from "@angular/core";
import { ConsultasService } from "../../services/consultas.service";

@Component({
  selector: "app-grupos-servicios-especiales",
  templateUrl: "./grupos-servicios-especiales.page.html",
  styleUrls: ["./grupos-servicios-especiales.page.scss"]
})
export class GruposServiciosEspecialesPage implements OnInit {
  grupos: any[] = [];

  constructor(private consultasService: ConsultasService) {}

  ngOnInit() {
    this.consultasService.obtenerGruposEspecialidades().subscribe(data => {
      this.grupos = <any>data;
    });
  }
}
