import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultasService } from "src/app/services/consultas.service";
import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast.service';
import { ConfirmarSolicitudPage } from '../confirmar-solicitud/confirmar-solicitud.page';
import { NavController } from '@ionic/angular';
import { Servicio } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-solicitud-servicio",
  templateUrl: "./solicitud-servicio.page.html",
  styleUrls: ["./solicitud-servicio.page.scss"]
})

export class SolicitudServicioPage implements OnInit {
  servicio:string;
  servicios:any[];
  usuarios:any[];
  festivos:any[];
  xServicio:Servicio;
  fechaAct:string = String(new Date())
  horas = [2,3,4,6,8]
  constructor(private route:ActivatedRoute,
              private consultasService: ConsultasService,
              private toast: ToastService,
              public navCtrl:NavController,
              private router:Router) {}

  ngOnInit() {
    console.log(this.fechaAct)
    this.consultasService.obtenerServicios().subscribe((data:any) => {
      this.servicios = JSON.parse(data)
      this.servicio = this.route.snapshot.paramMap.get('servicio')
    })

    this.consultasService.obtenerUsuariosAsociados(UserService.idUser).subscribe((data:any) => {
      this.usuarios = JSON.parse(data)
    })

    this.consultasService.obtenerFestivos().subscribe((data:any) => {
      this.festivos = JSON.parse(data)
      console.log(this.festivos)
    })

    this.fechaAct = moment(this.fechaAct).format('YYYY-MM-DD')
  }

  async solicitarServicio(form) {
    var fecha_inicio = moment(form.fecha_inicio)
    var fecha_fin = moment(form.fecha_fin)
    let cantidad_dias = fecha_fin.diff(fecha_inicio,'days') + 1
    if(cantidad_dias <= 0){
      this.toast.mostrarNotificacion('Las fechas ingresadas no son validas',2000)
      return
    }
    // Valido si hay alguna fecha que sea domingo o festivo
    let numDias = 1
    let fecha = fecha_inicio
    while (numDias <= cantidad_dias) {
      if((fecha.isoWeekday() == 7 || this.festivos.find(fes => fes.fecha === fecha.format('YYYY-MM-DD'))) && form.horas < 4){
        console.log("Error")
        return
      }
      console.log(fecha.format('YYYY-MM-DD'))
      fecha = fecha.add(1,"day")
      numDias += 1
    }
    let user = this.usuarios.find(user => user.id == form.usuario)
    this.xServicio = {
      id_empleado : 1,
      id_usuario : form.usuario,
      cantidad_dias : cantidad_dias,
      hora_fin : moment(form.hora_inicio).add(form.horas, 'hours').format('HH:mm'),
      hora_inicio : moment(form.hora_inicio).format('HH:mm'),
      valor : 0,
      estado : 1,
      fecha_inicio: fecha_inicio.format('YYYY-MM-DD'),
      fecha_fin: moment(form.fecha_fin).format('YYYY-MM-DD'),
      servicio: this.servicio,
      nombreServicio: (this.servicios.find(ser => ser.codigo === this.servicio)).descripcion,
      horas:form.horas,
      direccion:user.direccion,
      ciudad:user.ciudad
    }
    ConfirmarSolicitudPage.xSolicitud = <any>this.xServicio
    this.router.navigate(['/confirmar-solicitud'])
  }
}

