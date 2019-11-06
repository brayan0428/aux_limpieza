import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private navCtrl: NavController) {}

  ionViewWillEnter() {
    if (UserService.idUser) {
      this.navCtrl.navigateRoot("/solicitar-servicio");
    }
  }
}
