import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from "src/app/services/consultas.service";
import * as moment from 'moment';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: "app-solicitud-servicio",
  templateUrl: "./solicitud-servicio.page.html",
  styleUrls: ["./solicitud-servicio.page.scss"]
})

export class SolicitudServicioPage implements OnInit {
  servicio:string;
  servicios:[];
  xServicio:Servicio;

  horas = [2,3,4,6,8]
  constructor(private route:ActivatedRoute,
              private consultasService: ConsultasService,
              private toast: ToastService) {}

  ngOnInit() {
    this.consultasService.obtenerServicios().subscribe((data:any) => {
      this.servicios = data
      this.servicio = this.route.snapshot.paramMap.get('servicio')
    })

  }

  async solicitarServicio(form) {
    var fecha_inicio = moment(form.fecha_inicio)
    var fecha_fin = moment(form.fecha_fin)
    let cantidad_dias = fecha_fin.diff(fecha_inicio,'days') + 1
    console.log(cantidad_dias)
    if(cantidad_dias <= 0){
      this.toast.mostrarNotificacion('Las fechas ingresadas no son validas',2000)
      return
    }
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
      servicio: form.servicio,
      horas:form.horas
    }
    console.log(this.xServicio)
    console.log(moment(form.hora_inicio).format('HH:mm'))
    var status = moment(form.hora_inicio).add(5, 'hours').format('HH:mm');
    console.log(status)
  }
}

interface Servicio {
  id_usuario:number,
  id_empleado:number,
  servicio:string,
  cantidad_dias:number,
  fecha_inicio:string,
  fecha_fin:string,
  horas:number,
  hora_inicio:string,
  hora_fin:string,
  valor:number,
  estado:number
}