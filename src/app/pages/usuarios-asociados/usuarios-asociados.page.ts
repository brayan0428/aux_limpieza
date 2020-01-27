import { Component, OnInit } from "@angular/core";
import { ConsultasService } from "../../services/consultas.service";
import { UserService } from "src/app/services/user.service";
import { LoadingService } from "src/app/services/loading.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-usuarios-asociados",
  templateUrl: "./usuarios-asociados.page.html",
  styleUrls: ["./usuarios-asociados.page.scss"]
})
export class UsuariosAsociadosPage implements OnInit {
  usuarios: any[];
  constructor(
    private consultasService: ConsultasService,
    private loadingService: LoadingService,
    private route: Router
  ) {}

  async ngOnInit() {
    await this.loadingService.showCargando("Cargando...");
    this.consultasService
      .obtenerUsuariosAsociados(UserService.idUser)
      .subscribe((data: any) => {
        this.usuarios = JSON.parse(data);
        console.log(this.usuarios);
        this.loadingService.stopCargando();
      });
  }

  async mostrarModal(id) {
    this.route.navigate([`/agregar-usuario-asociado/${id}`]);
  }
}
