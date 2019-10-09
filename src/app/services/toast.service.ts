import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl:ToastController) { }

  async mostrarNotificacion(message, duration,color:string = 'primary',showCloseButton:boolean = true) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      showCloseButton,
      closeButtonText: 'CERRAR'
    });
    toast.present();
  }
}
