import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConsultasService } from "src/app/services/consultas.service";
import * as moment from "moment";
import { ToastService } from "src/app/services/toast.service";
import { ConfirmarSolicitudPage } from "../confirmar-solicitud/confirmar-solicitud.page";
import { NavController } from "@ionic/angular";
import { Servicio } from "src/app/interfaces/interfaces";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-solicitud-servicio",
  templateUrl: "./solicitud-servicio.page.html",
  styleUrls: ["./solicitud-servicio.page.scss"]
})
export class SolicitudServicioPage implements OnInit {
  servicio: string;
  servicios: any[];
  usuarios: any[];
  festivos: any[];
  ciudades = [];
  dias = [];
  xServicio: Servicio;
  fechaAct: string = String(new Date());
  horas = [2, 3, 4, 6, 8];
  constructor(
    private route: ActivatedRoute,
    private consultasService: ConsultasService,
    private toast: ToastService,
    public navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.fechaAct);
    this.consultasService.obtenerServicios().subscribe((data: any) => {
      this.servicios = JSON.parse(data);
      this.servicio = this.route.snapshot.paramMap.get("servicio");
    });
    /*this.consultasService
      .obtenerUsuariosAsociados(UserService.idUser)
      .subscribe((data: any) => {
        this.usuarios = JSON.parse(data);
      });*/

    this.consultasService.obtenerFestivos().subscribe((data: any) => {
      this.festivos = JSON.parse(data);
      console.log(this.festivos);
    });

    this.fechaAct = moment(this.fechaAct).format("YYYY-MM-DD");

    this.consultasService.obtenerCiudades().subscribe((data: any) => {
      this.ciudades = JSON.parse(data);
    });

    for (let i = 1; i <= 31; i++) {
      this.dias.push(i);
    }
  }

  async solicitarServicio(form) {
    console.log(form);
    var fecha_inicio = moment(form.fecha_inicio);
    var fecha_fin = moment(form.fecha_fin);
    const diaActual = moment().format("DD/MM/YYYY")
    // Valido si hay alguna fecha que sea domingo o festivo
    let fecha = fecha_inicio,
      fechaini = fecha_inicio;
    let cantidad_dias = 1;
    let existeDiaEspecial = false;
    while (cantidad_dias <= form.dias) {
      if (
        (fecha.isoWeekday() == 7 ||
          this.festivos.find(
            fes => fes.fecha === fecha.format("YYYY-MM-DD")
          ))
      ) {
        existeDiaEspecial = true
        if(form.horas < 4){
                  this.toast.mostrarNotificacion(
          "Los domingos y festivos el servicio minimo es de 4 horas",
          2500
        );
        return;
        }

      }
      fecha = fecha.add(1, "day");
      cantidad_dias++;
    }
    if(existeDiaEspecial && parseInt(form.dias) > 1){
      this.toast.mostrarNotificacion(
        "Los servicios para domingos, festivos y nocturnos deben ser unitarios",
        2500
      );
      return;
    }
    if(diaActual === fecha_inicio.format("DD/MM/YYYY")){
      const horaSeleccionada = moment(form.hora_inicio)
      const horaActual = moment()
      const duration = moment.duration(horaActual.diff(horaSeleccionada))
      const hours = duration.asHours()
      if(hours > -2){
        this.toast.mostrarNotificacion(
          "Debe solicitar el servicio minimo dos horas antes",
          2500
        );
        return;
      }
    }
    this.xServicio = {
      id_empleado: 1,
      cantidad_dias: form.dias,
      hora_fin: moment(form.hora_inicio)
        .add(form.horas, "hours")
        .format("HH:mm"),
      hora_inicio: moment(form.hora_inicio).format("HH:mm"),
      valor: 0,
      estado: 1,
      fecha_inicio: fecha_inicio
        .add(form.dias * -1, "day")
        .format("YYYY-MM-DD"),
      servicio: this.servicio,
      nombreServicio: this.servicios.find(ser => ser.codigo === this.servicio)
        .descripcion,
      horas: form.horas,
      ciudad: form.ciudad
    };
    ConfirmarSolicitudPage.xSolicitud = <any>this.xServicio;
    this.router.navigate(["/confirmar-solicitud"]);
  }
}
