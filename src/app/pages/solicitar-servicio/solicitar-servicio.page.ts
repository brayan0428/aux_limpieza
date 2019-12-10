import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { ConsultasService } from "src/app/services/consultas.service";
import { LoadingService } from "src/app/services/loading.service";

@Component({
  selector: "app-solicitar-servicio",
  templateUrl: "./solicitar-servicio.page.html",
  styleUrls: ["./solicitar-servicio.page.scss"]
})
export class SolicitarServicioPage implements OnInit {
  servicios: any[];
  constructor(
    private consultasService: ConsultasService,
    private loading: LoadingService
  ) {}

  async ngOnInit() {
    await this.loading.showCargando("Cargando...");
    this.consultasService.obtenerServicios().subscribe((data: any) => {
      this.servicios = JSON.parse(data);
      this.loading.stopCargando();
    });
  }

  ionViewDidEnter() {}
}
