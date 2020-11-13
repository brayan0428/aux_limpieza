import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConsultasService } from 'src/app/services/consultas.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.page.html',
  styleUrls: ['./olvido-contrasena.page.scss'],
})
export class OlvidoContrasenaPage implements OnInit {

  constructor(private consultasService:ConsultasService,
              private loading:LoadingService,
              private toast:ToastService,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  async onSubmit(form){
    const data = form.value
    await this.loading.showCargando("Espere...");
    this.consultasService.olvidoContrasena(data).subscribe((data:any) => {
      this.loading.stopCargando();
      if (data.error) {
        this.toast.mostrarNotificacion(data.message, 2000);
        return;
      }
      this.toast.mostrarNotificacion(
        "Cambio exitoso. Su nueva clave es su numero de documento",
        2000
      );
      this.navCtrl.navigateRoot("/login");
    })
  }
}
