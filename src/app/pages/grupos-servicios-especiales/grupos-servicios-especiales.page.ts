import { Component, OnInit } from "@angular/core";
import { ConsultasService } from "../../services/consultas.service";
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: "app-grupos-servicios-especiales",
  templateUrl: "./grupos-servicios-especiales.page.html",
  styleUrls: ["./grupos-servicios-especiales.page.scss"]
})
export class GruposServiciosEspecialesPage implements OnInit {
  grupos: any[] = [];

  constructor(private consultasService: ConsultasService,
              private loading:LoadingService) {}

  async ngOnInit() {
    await this.loading.showCargando('Cargando...')
    this.consultasService.obtenerGruposEspecialidades().subscribe((data:any) => {
      this.grupos = JSON.parse(data);
      this.loading.stopCargando()
    });
  }
}
