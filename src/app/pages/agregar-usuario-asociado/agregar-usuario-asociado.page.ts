import { Component, OnInit } from "@angular/core";
import { ConsultasService } from "src/app/services/consultas.service";
import { ProcesosService } from "src/app/services/procesos.service";
import { NavController, AlertController } from "@ionic/angular";
import { ToastService } from "src/app/services/toast.service";
import { LoadingService } from "../../services/loading.service";
import { UserService } from "src/app/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { UsuariosAsociadosPage } from "../usuarios-asociados/usuarios-asociados.page";

@Component({
  selector: "app-agregar-usuario-asociado",
  templateUrl: "./agregar-usuario-asociado.page.html",
  styleUrls: ["./agregar-usuario-asociado.page.scss"]
})
export class AgregarUsuarioAsociadoPage implements OnInit {
  ciudades: [];
  usuario: any = {
    nombre: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    id: 0,
    nombreCiudad: ""
  };
  id_usuario: number = 0;
  constructor(
    private consultasService: ConsultasService,
    private procesosService: ProcesosService,
    private toast: ToastService,
    private loading: LoadingService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertController:AlertController
  ) {}

  async ngOnInit() {
    this.id_usuario = parseInt(this.route.snapshot.paramMap.get("id"));
    await this.loading.showCargando("Cargando...");
    this.consultasService.obtenerCiudades().subscribe((data: any) => {
      this.ciudades = JSON.parse(data);
      this.loading.stopCargando();
    });
    if (this.id_usuario !== 0) {
      this.consultasService
        .obtenerUsuariosAsociados(UserService.idUser)
        .subscribe((data: any) => {
          this.usuario = JSON.parse(data);
          this.usuario = this.usuario.filter(
            user => parseInt(user.id) === this.id_usuario
          )[0];
          console.log(this.usuario);
        });
    }
  }

  async onSubmit(form) {
    form.id_usuario = UserService.idUser;
    form.id = this.usuario.id;
    console.log(form);
    await this.loading.showCargando("Espere...");
    this.procesosService.guardarUsuarioAsociado(form).subscribe((data: any) => {
      if (data["error"]) {
        this.toast.mostrarNotificacion(data["message"], 2000);
      } else {
        this.toast.mostrarNotificacion("Información guardada con exito", 2000);
        this.navCtrl.navigateRoot("/usuarios-asociados");
      }
      this.loading.stopCargando();
    });
  }

  async eliminarUsuario(){
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: 'Esta seguro que desea eliminar el usuario?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Si',
          handler: () => {
            this.deleteUser()
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteUser(){
    let data = {
      id_usuario : UserService.idUser,
      id:this.usuario.id
    }
    await this.loading.showCargando("Espere...");
    this.procesosService.eliminarUsuarioAsociado(data).subscribe((data: any) => {
      if (data["error"]) {
        this.toast.mostrarNotificacion(data["message"], 2000);
      } else {
        this.toast.mostrarNotificacion("Usuario eliminado con exito", 2000);
        this.navCtrl.navigateRoot("/usuarios-asociados");
      }
      this.loading.stopCargando();
    });
  }
}
