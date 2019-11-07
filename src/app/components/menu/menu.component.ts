import { Component, OnInit, DoCheck, AfterContentInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit, DoCheck {
  userLogged;
  constructor(private alertController:AlertController,
              private navCtrl:NavController) {}

  ngOnInit() {
    console.log("ngOnInit");
  }

  ngDoCheck() {
    this.userLogged = UserService.loggedUser;
  }

  async CerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: 'Esta seguro que desea salir?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Si',
          handler: () => {
            UserService.CerrarSesion()
            this.navCtrl.navigateRoot('/home')
          }
        }
      ]
    });

    await alert.present();
  }
}
