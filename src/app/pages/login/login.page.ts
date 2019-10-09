import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private consultasService:ConsultasService,
              private toast:ToastService,
              private loading:LoadingService,
              private navCtrl:NavController ) { }

  ngOnInit() {
    localStorage.clear()
  }

  async onSubmit(form){
    localStorage.removeItem('idUsuario')
    await this.loading.showCargando('Espere...')
    this.consultasService.validarLogin(form).subscribe((data:any) => {
      this.loading.stopCargando()
      if(data["error"]){
        this.toast.mostrarNotificacion(data["error"],2000)
        return
      }else{
        if(data.length <= 0){
          this.toast.mostrarNotificacion('Usuario o Contraseña Invalidos',2000)
          return
        }
      }
      console.log(data[0]["id"])
      localStorage.setItem('idUser',data[0]["id"])
      this.navCtrl.navigateRoot('/solicitar-servicio')
    })
  }
}
