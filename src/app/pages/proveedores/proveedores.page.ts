import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConsultasService } from "src/app/services/consultas.service";
import { LoadingService } from "src/app/services/loading.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-proveedores",
  templateUrl: "./proveedores.page.html",
  styleUrls: ["./proveedores.page.scss"]
})
export class ProveedoresPage implements OnInit {
  proveedores = [];
  proveedoresFilter = [];
  ciudades: [];
  userLogged: boolean;
  constructor(
    private router: ActivatedRoute,
    private consultasService: ConsultasService,
    private loading: LoadingService
  ) {}

  async ngOnInit() {
    this.userLogged = UserService.loggedUser;
    await this.loading.showCargando("Consultando...");
    let id = this.router.snapshot.paramMap.get("especialidad");
    this.consultasService.obtenerProveedores(id).subscribe((data: any) => {
      this.proveedores = JSON.parse(data);
      this.proveedoresFilter = JSON.parse(data);
      console.log(this.proveedores);
      if (this.userLogged) {
        this.proveedoresFilter = this.proveedores.filter(p => {
          return (
            p.codigoCiudad
              .toLowerCase()
              .indexOf(UserService.ciudadUser.toLowerCase()) > -1
          );
        });
      }
      this.loading.stopCargando();
    });
    this.consultasService.obtenerCiudades().subscribe((data: any) => {
      this.ciudades = JSON.parse(data);
    });
  }

  cambiarCiudad(e) {
    const ciudad = e.target.value;
    if (ciudad === "") {
      this.proveedoresFilter = this.proveedores;
      return;
    }
    this.proveedoresFilter = this.proveedores.filter(p => {
      return (
        p.codigoCiudad.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
    });
  }
}
