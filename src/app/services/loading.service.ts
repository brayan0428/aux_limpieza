import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading:any;

  constructor(private loadingCtrl:LoadingController) { }

  async showCargando(message) {
    this.loading = await this.loadingCtrl.create({
      message
    });
    return this.loading.present();
  }

  stopCargando(){
    this.loading.dismiss()
  }
}
