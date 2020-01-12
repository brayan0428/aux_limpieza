import { Component, OnInit } from "@angular/core";
import { ConsultasService } from "src/app/services/consultas.service";
import { ProcesosService } from "src/app/services/procesos.service";
import { NavController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { LoadingService } from "../../services/loading.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-agregar-usuario-asociado",
  templateUrl: "./agregar-usuario-asociado.page.html",
  styleUrls: ["./agregar-usuario-asociado.page.scss"]
})
export class AgregarUsuarioAsociadoPage implements OnInit {
  ciudades: [];
  constructor(
    private consultasService: ConsultasService,
    private procesosService: ProcesosService,
    private toast: ToastService,
    private loading: LoadingService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.consultasService.obtenerCiudades().subscribe((data: any) => {
      this.ciudades = JSON.parse(data);
    });
  }

  async onSubmit(form) {
    form.id_usuario = UserService.idUser;
    await this.loading.showCargando("Espere...");
    this.procesosService.guardarUsuarioAsociado(form).subscribe((data: any) => {
      if (data["error"]) {
        this.toast.mostrarNotificacion(data["message"], 2000);
      } else {
        this.toast.mostrarNotificacion("Usuario creado exitosamente", 2000);
        this.navCtrl.navigateRoot("/usuarios-asociados");
      }
      this.loading.stopCargando();
    });
  }
}
