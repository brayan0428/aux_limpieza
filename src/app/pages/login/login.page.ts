import { Component, OnInit } from "@angular/core";
import { ConsultasService } from "src/app/services/consultas.service";
import { ToastService } from "src/app/services/toast.service";
import { LoadingService } from "src/app/services/loading.service";
import { NavController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  url: string = "";
  constructor(
    private consultasService: ConsultasService,
    private toast: ToastService,
    private loading: LoadingService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    let proxURL = localStorage.getItem("proxUrl");
    if (proxURL !== null) {
      this.url = proxURL;
      console.log(this.url);
    }
    localStorage.clear();
  }

  async onSubmit(form) {
    localStorage.removeItem("idUsuario");
    await this.loading.showCargando("Espere...");
    this.consultasService.validarLogin(form).subscribe((data: any) => {
      this.loading.stopCargando();
      if (data["error"]) {
        this.toast.mostrarNotificacion(data["error"], 2000);
        return;
      } else {
        if (data.length <= 0) {
          this.toast.mostrarNotificacion(
            "Usuario o Contraseña Invalidos",
            2000
          );
          return;
        }
      }
      UserService.loggedUser = true;
      UserService.idUser = data[0]["id"];
      UserService.nombresUser = data[0]["nombres"];
      UserService.apellidosUser = data[0]["apellidos"];
      UserService.correoUser = data[0]["correo"];
      UserService.cedulaUser = data[0]["cedula"];
      UserService.ciudadUser = data[0]["ciudad"];
      UserService.telefonoUser = data[0]["telefono"];
      UserService.direccionUser = data[0]["direccion"]
      if (this.url !== "") {
        this.navCtrl.navigateRoot(this.url);
        return;
      }
      this.navCtrl.navigateRoot("/solicitar-servicio");
    });
  }
}
