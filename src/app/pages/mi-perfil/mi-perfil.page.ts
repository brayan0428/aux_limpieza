import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { ConsultasService } from "src/app/services/consultas.service";
import { LoadingService } from "src/app/services/loading.service";
import { ProcesosService } from "src/app/services/procesos.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-mi-perfil",
  templateUrl: "./mi-perfil.page.html",
  styleUrls: ["./mi-perfil.page.scss"],
})
export class MiPerfilPage implements OnInit {
  user = {};
  ciudades: [];
  constructor(
    private consultasService: ConsultasService,
    private procesosService: ProcesosService,
    private loading: LoadingService,
    private toast: ToastService
  ) {}

  async ngOnInit() {
    await this.loading.showCargando("Espere...");
    this.consultasService
      .obtenerUsuario(UserService.idUser)
      .subscribe((data: any) => {
        const user = data[0];
        this.user = {
          id: UserService.idUser,
          cedula: user.cedula,
          nombres: user.nombres,
          apellidos: user.apellidos,
          telefono: user.telefono,
          email: user.correo,
          direccion: user.direccion,
          ciudad: user.ciudad,
        };
      });

    this.consultasService.obtenerCiudades().subscribe((data: any) => {
      this.ciudades = JSON.parse(data);
      this.loading.stopCargando();
    });
  }

  async guardarDatos(form) {
    form.id = this.user["id"];
    form.id_usuario = UserService.idUser;
    console.log(form);
    await this.loading.showCargando("Espere...");
    this.procesosService.actualizarUsuario(form).subscribe((data) => {
      if (data["error"]) {
        let message = data["message"];
        this.toast.mostrarNotificacion(message, 2000);
      } else {
        this.toast.mostrarNotificacion(
          "Usuario actualizado exitosamente",
          2000
        );
      }
      this.loading.stopCargando();
    });
  }
}
