import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { ConsultasService } from 'src/app/services/consultas.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-confirmar-solicitud',
  templateUrl: './confirmar-solicitud.page.html',
  styleUrls: ['./confirmar-solicitud.page.scss'],
})
export class ConfirmarSolicitudPage implements OnInit {
  public static xSolicitud:Servicio;
  solicitud:Servicio;
  valores:any[] = [];

  valorxDia:number = 0;
  subtotal:number = 0;
  porcentajeDescuento:number = 0;
  descuento:number = 0;
  total:number = 0;

  constructor(private navCtrl:NavController,
              private consultasService:ConsultasService,
              private loading:LoadingService) { 
    this.solicitud = ConfirmarSolicitudPage.xSolicitud;
    if (this.solicitud == undefined){
      this.navCtrl.navigateRoot('/solicitar-servicio')
    }
  }

  async ngOnInit() {
    
  }

  async ionViewWillEnter(){
    this.solicitud = ConfirmarSolicitudPage.xSolicitud;
    if (this.solicitud == undefined){
      this.navCtrl.navigateRoot('/solicitar-servicio')
    }
    console.log(ConfirmarSolicitudPage.xSolicitud)
    let data = {
      "servicio" : this.solicitud.servicio,
      "ciudad": "08001",
      "dias":this.solicitud.cantidad_dias,
      "horas":this.solicitud.horas,
      "especial":0
    }
    await this.loading.showCargando('Cargando...')
    this.consultasService.obtenerValorServicio(data).subscribe(data => {
      this.valores = data[0]
      this.valorxDia = this.valores[0].Valor
      this.porcentajeDescuento = this.valores[0].Descuento * 100
      this.subtotal = this.solicitud.cantidad_dias * this.valorxDia
      this.descuento =this.subtotal * this.valores[0].Descuento
      this.total = this.valores[0].Total
      this.loading.stopCargando()
    })
  }
}
