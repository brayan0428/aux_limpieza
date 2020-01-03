import { Component, OnInit } from "@angular/core";
import { Servicio } from "src/app/interfaces/interfaces";
import { NavController } from "@ionic/angular";
import { ConsultasService } from "src/app/services/consultas.service";
import { LoadingService } from "src/app/services/loading.service";
import { ToastService } from "../../services/toast.service";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-confirmar-solicitud",
  templateUrl: "./confirmar-solicitud.page.html",
  styleUrls: ["./confirmar-solicitud.page.scss"]
})
export class ConfirmarSolicitudPage implements OnInit {
  public static xSolicitud: Servicio;
  solicitud: Servicio;
  valores: any[] = [];
  formaPago: string;

  valorxDia: number = 0;
  subtotal: number = 0;
  porcentajeDescuento: number = 0;
  descuento: number = 0;
  total: number = 0;

  constructor(
    private navCtrl: NavController,
    private consultasService: ConsultasService,
    private loading: LoadingService,
    private toast: ToastService
  ) {
    this.solicitud = ConfirmarSolicitudPage.xSolicitud;
    if (this.solicitud == undefined) {
      this.navCtrl.navigateRoot("/solicitar-servicio");
    }
  }

  async ngOnInit() {}

  async ionViewWillEnter() {
    this.solicitud = ConfirmarSolicitudPage.xSolicitud;
    UserService.xServicio = this.solicitud
    if (this.solicitud == undefined) {
      this.navCtrl.navigateRoot("/solicitar-servicio");
    }
    console.log(ConfirmarSolicitudPage.xSolicitud);
    let data = {
      servicio: this.solicitud.servicio,
      ciudad: this.solicitud.ciudad,
      dias: this.solicitud.cantidad_dias,
      horas: this.solicitud.horas,
      fecha_inicio: this.solicitud.fecha_inicio
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
    });
  }

  RealizarPago() {
    if (this.formaPago == undefined || this.formaPago == "") {
      this.toast.mostrarNotificacion("Debe seleccionar la forma de pago", 2500);
      return;
    }
    if (this.formaPago == "TC") {
      this.navCtrl.navigateRoot("/fp-tarjetacredito");
    }
  }
}
