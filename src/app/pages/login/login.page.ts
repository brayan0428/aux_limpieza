import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

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
      UserService.loggedUser = true
      UserService.idUser = data[0]["id"]
      UserService.nombresUser = data[0]["nombres"]
      UserService.apellidosUser = data[0]["apellidos"]
      UserService.correoUser = data[0]["correo"]
      
      this.navCtrl.navigateRoot('/solicitar-servicio')
    })
  }
}
