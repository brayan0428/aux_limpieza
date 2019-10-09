import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Observable } from 'rxjs';
import { ProcesosService } from 'src/app/services/procesos.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  ciudades:[];
  constructor(private consultasService:ConsultasService,
              private procesosService:ProcesosService,
              private toast:ToastService,
              private loading:LoadingService,
              private navCtrl:NavController) { }


  ngOnInit() {
    this.consultasService.getCiudades().subscribe((data: any) => {
      this.ciudades = data
    })
  }

  async guardarUsuario(form){
    if(form.clave != form.confirmarClave){
      this.toast.mostrarNotificacion('Las claves no coinciden',2000)
      return
    }
    await this.loading.showCargando('Espere...')
    this.procesosService.guardarUsuario(form).subscribe((data) => {
      if(data["error"]){
        this.toast.mostrarNotificacion(data["error"],2000)
      }else{
        this.toast.mostrarNotificacion('Usuario creado exitosamente',2000)
        this.navCtrl.navigateRoot('/home')
      }
      this.loading.stopCargando()
    })
  }
}

