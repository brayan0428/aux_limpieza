import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProcesosService } from 'src/app/services/procesos.service';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-fp-tarjetacredito',
  templateUrl: './fp-tarjetacredito.page.html',
  styleUrls: ['./fp-tarjetacredito.page.scss'],
})
export class FpTarjetacreditoPage implements OnInit {
  constructor(private procesosService:ProcesosService,
              private toast:ToastService,
              private navCtrl: NavController,
              private loading:LoadingService) { }

  ngOnInit() {
  }

  async procesarPago(form){
    UserService.xServicio.numero_tarjeta = form.numero_tarjeta
    UserService.xServicio.expiracion = String(form.expiracion).substr(0,7).replace("-","/")
    UserService.xServicio.cvv = form.cvv
    UserService.xServicio.nombre_titular = form.nombre_titular
    let tipo_tarjeta = '',
        primerNumeroTarjeta = String(form.numero_tarjeta).split("")[0] 
    if(primerNumeroTarjeta == "4"){
      tipo_tarjeta = "VISA"
    }else{
      if(primerNumeroTarjeta == "5"){
        tipo_tarjeta = "MASTERCARD"
      }
    }
    UserService.xServicio.tipo_tarjeta = tipo_tarjeta
    console.log(UserService.xServicio)
    await this.loading.showCargando("Espere...");
    this.procesosService.pagoTarjetaCredito(UserService.xServicio).subscribe((data:any) => {
      this.loading.stopCargando();
      if (data["error"]) {
        this.toast.mostrarNotificacion(data["message"], 2000);
        return;
      }else{
        this.toast.mostrarNotificacion("Servicio ingresado exitosamente", 2000);
        this.navCtrl.navigateRoot("/mis-servicios");
      }
    })
  }
}
