import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConsultasService } from "../../services/consultas.service";
import { LoadingService } from "../../services/loading.service";

@Component({
  selector: "app-servicios-especiales",
  templateUrl: "./servicios-especiales.page.html",
  styleUrls: ["./servicios-especiales.page.scss"]
})
export class ServiciosEspecialesPage implements OnInit {
  especialidades: any[] = [];
  constructor(
    private router: ActivatedRoute,
    private consultasService: ConsultasService,
    private loading: LoadingService
  ) {}

  async ngOnInit() {
    await this.loading.showCargando("Consultando...");
    let id = this.router.snapshot.paramMap.get("id");
    this.consultasService.obtenerEspecialidadesxGrupo(id).subscribe(data => {
      this.especialidades = <any>data;
      this.loading.stopCargando();
    });
  }
}
