import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProcesosService } from 'src/app/services/procesos.service';

@Component({
  selector: 'app-fp-tarjetacredito',
  templateUrl: './fp-tarjetacredito.page.html',
  styleUrls: ['./fp-tarjetacredito.page.scss'],
})
export class FpTarjetacreditoPage implements OnInit {
  constructor(private procesosService:ProcesosService) { }

  ngOnInit() {
  }

  procesarPago(form){
    console.log(String(form.expiracion).substr(0,7).replace("-","/"))
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
    this.procesosService.pagoTarjetaCredito(UserService.xServicio).subscribe(data => {
      console.log(data)
    })
  }
}
