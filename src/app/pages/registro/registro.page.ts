import { Component, OnInit } from "@angular/core";
import { ConsultasService } from "src/app/services/consultas.service";
import { Observable } from "rxjs";
import { ProcesosService } from "src/app/services/procesos.service";
import { ToastService } from "src/app/services/toast.service";
import { LoadingService } from "src/app/services/loading.service";
import { NavController, Platform } from "@ionic/angular";
import {
  DocumentViewer,
  DocumentViewerOptions,
} from "@ionic-native/document-viewer/ngx";
import { File } from "@ionic-native/File/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  ciudades: [];
  acepta_terminos: boolean = false;
  url: string = "";
  constructor(
    private consultasService: ConsultasService,
    private procesosService: ProcesosService,
    private toast: ToastService,
    private loading: LoadingService,
    private navCtrl: NavController,
    private document: DocumentViewer,
    private plataforma: Platform,
    private file: File,
    private ft: FileTransfer,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {
    this.consultasService.obtenerCiudades().subscribe((data: any) => {
      this.ciudades = JSON.parse(data);
    });

    let proxURL = localStorage.getItem("proxUrl");
    if (proxURL !== null) {
      this.url = proxURL;
      console.log(this.url);
    }
    localStorage.clear();
  }

  async guardarUsuario(form) {
    console.log(form);
    if (form.clave != form.confirmarClave) {
      this.toast.mostrarNotificacion("Las claves no coinciden", 2000);
      return;
    }
    if (form.acepta_terminos == false) {
      this.toast.mostrarNotificacion(
        "Debe aceptar los terminos y condiciones",
        2000
      );
      return;
    }
    form.perfil = 1;
    console.log(form);
    await this.loading.showCargando("Espere...");
    this.procesosService.guardarUsuario(form).subscribe((data) => {
      if (data["error"]) {
        let message = data["message"];
        if (String(message).indexOf("Duplicate") > -1) {
          message = "Ya existe un usuario registrado con el numero de cedula";
        }
        this.toast.mostrarNotificacion(message, 2000);
      } else {
        this.validarLogin(form);
      }
      this.loading.stopCargando();
    });
  }

  abrirTerminos() {
    let downloadUrl =
      "https://auxlimpieza.com/wp-content/uploads/2019/11/terminos-y-condiciones-app.pdf";
    let path = this.file.dataDirectory;
    const transfer = this.ft.create();
    transfer
      .download(downloadUrl, `${path}terminos_condiciones_usuario.pdf`)
      .then((entry) => {
        let url = entry.toURL();
        console.log(url);
        if (this.plataforma.is("android")) {
          this.fileOpener.open(url, "application/pdf");
        } else {
          this.document.viewDocument(url, "application/pdf", {});
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  validarLogin(form) {
    this.consultasService.validarLogin(form).subscribe((data: any) => {
      if (data["error"]) {
        this.toast.mostrarNotificacion(data["error"], 2000);
        return;
      } else {
        if (data.length <= 0) {
          this.toast.mostrarNotificacion(
            "Usuario o Contraseña Invalidos",
            2000
          );
          return;
        }
      }
      UserService.loggedUser = true;
      UserService.idUser = data[0]["id"];
      UserService.nombresUser = data[0]["nombres"];
      UserService.apellidosUser = data[0]["apellidos"];
      UserService.correoUser = data[0]["correo"];
      UserService.cedulaUser = data[0]["cedula"];
      UserService.ciudadUser = data[0]["ciudad"];
      UserService.telefonoUser = data[0]["telefono"];
      UserService.direccionUser = data[0]["direccion"];
      this.loading.stopCargando();
      if (this.url !== "") {
        this.navCtrl.navigateRoot(this.url);
        return;
      }
      this.navCtrl.navigateRoot("/solicitar-servicio");
    });
  }
}
