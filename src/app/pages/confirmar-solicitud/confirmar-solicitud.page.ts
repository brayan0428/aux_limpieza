import { Component, OnInit } from "@angular/core";
import { Servicio } from "src/app/interfaces/interfaces";
import { NavController } from "@ionic/angular";
import { ConsultasService } from "src/app/services/consultas.service";
import { LoadingService } from "src/app/services/loading.service";
import { ToastService } from "../../services/toast.service";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-confirmar-solicitud",
  templateUrl: "./confirmar-solicitud.page.html",
  styleUrls: ["./confirmar-solicitud.page.scss"],
})
export class ConfirmarSolicitudPage implements OnInit {
  public static xSolicitud: Servicio;
  solicitud: Servicio;
  valores: any[] = [];
  formaPago: string;
  id_usuario: string = "";
  usserLogged: boolean = false;
  valorxDia: number = 0;
  subtotal: number = 0;
  porcentajeDescuento: number = 0;
  descuento: number = 0;
  total: number = 0;
  usuarios: any[];

  constructor(
    private navCtrl: NavController,
    private consultasService: ConsultasService,
    private loading: LoadingService,
    private toast: ToastService,
    private router: Router
  ) {
    this.solicitud = ConfirmarSolicitudPage.xSolicitud;
    if (this.solicitud == undefined) {
      this.navCtrl.navigateRoot("/solicitar-servicio");
    }
  }

  async ngOnInit() {}

  async ionViewWillEnter() {
    this.usserLogged = UserService.loggedUser;
    this.solicitud = ConfirmarSolicitudPage.xSolicitud;
    UserService.xServicio = this.solicitud;
    if (this.solicitud == undefined) {
      this.navCtrl.navigateRoot("/solicitar-servicio");
    }
    let data = {
      servicio: this.solicitud.servicio,
      ciudad: this.solicitud.ciudad,
      dias: this.solicitud.cantidad_dias,
      horas: this.solicitud.horas,
      fecha_inicio: this.solicitud.fecha_inicio,
    };
    await this.loading.showCargando("Cargando...");
    this.consultasService.obtenerValorServicio(data).subscribe((data: any) => {
      data = JSON.parse(data);
      this.valores = data[0];
      console.log(this.valores);
      this.valorxDia = this.valores["ValorOrdinario"];
      this.porcentajeDescuento = this.valores["Descuento"] * 100;
      this.subtotal = this.solicitud.cantidad_dias * this.valorxDia;
      this.descuento = this.subtotal * this.valores["Descuento"];
      this.total = this.valores["Total"];
      this.loading.stopCargando();
      UserService.xServicio.valor_normal = this.valores["ValorOrdinario"];
      UserService.xServicio.valor_especial = this.valores["ValorEspecial"];
      UserService.xServicio.valor = this.valores["Total"];
    });

    if (this.usserLogged) {
      this.consultasService
        .obtenerUsuariosAsociados(UserService.idUser)
        .subscribe((data: any) => {
          this.usuarios = JSON.parse(data);
        });
    }
  }

  RealizarPago() {
    if (!this.usserLogged) {
      this.toast.mostrarNotificacion("Debe iniciar sesión", 2500);
      localStorage.setItem("proxUrl", "/confirmar-solicitud");
      this.navCtrl.navigateRoot("/registro");
      return;
    }
    if (this.id_usuario == "") {
      this.toast.mostrarNotificacion(
        "Debe seleccionar el usuario del servicio",
        2500
      );
      return;
    }
    UserService.xServicio.id_usuario = parseInt(this.id_usuario);
    let user = this.usuarios.find(
      (user) => parseInt(user.id) === parseInt(this.id_usuario)
    );
    console.log(user);
    UserService.xServicio.direccion = user.direccion;
    UserService.xServicio.ciudad = user.ciudad;
    if (this.formaPago == undefined || this.formaPago == "") {
      this.toast.mostrarNotificacion("Debe seleccionar la forma de pago", 2500);
      return;
    }
    if (this.formaPago == "TC") {
      this.router.navigate(["/fp-tarjetacredito"]);
    }
  }
}
