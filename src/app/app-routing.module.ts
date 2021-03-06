import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: "./pages/home/home.module#HomePageModule",
    canActivate: [AuthGuardService],
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "registro",
    loadChildren: "./pages/registro/registro.module#RegistroPageModule",
  },
  {
    path: "solicitar-servicio",
    loadChildren:
      "./pages/solicitar-servicio/solicitar-servicio.module#SolicitarServicioPageModule",
  },
  {
    path: "servicios-especiales/:id",
    loadChildren:
      "./pages/servicios-especiales/servicios-especiales.module#ServiciosEspecialesPageModule",
  },
  {
    path: "lista-de-precios",
    loadChildren:
      "./pages/lista-de-precios/lista-de-precios.module#ListaDePreciosPageModule",
  },
  {
    path: "mis-servicios",
    loadChildren:
      "./pages/mis-servicios/mis-servicios.module#MisServiciosPageModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "registro-proveedores",
    loadChildren:
      "./pages/registro-proveedores/registro-proveedores.module#RegistroProveedoresPageModule",
  },
  {
    path: "solicitud-servicio/:servicio",
    loadChildren:
      "./pages/solicitud-servicio/solicitud-servicio.module#SolicitudServicioPageModule",
  },
  {
    path: "grupos-servicios-especiales",
    loadChildren:
      "./pages/grupos-servicios-especiales/grupos-servicios-especiales.module#GruposServiciosEspecialesPageModule",
  },
  {
    path: "confirmar-solicitud",
    loadChildren:
      "./pages/confirmar-solicitud/confirmar-solicitud.module#ConfirmarSolicitudPageModule",
  },
  {
    path: "proveedores/:especialidad",
    loadChildren:
      "./pages/proveedores/proveedores.module#ProveedoresPageModule",
  },
  {
    path: "fp-tarjetacredito",
    loadChildren:
      "./pages/fp-tarjetacredito/fp-tarjetacredito.module#FpTarjetacreditoPageModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "usuarios-asociados",
    loadChildren:
      "./pages/usuarios-asociados/usuarios-asociados.module#UsuariosAsociadosPageModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "agregar-usuario-asociado/:id",
    loadChildren:
      "./pages/agregar-usuario-asociado/agregar-usuario-asociado.module#AgregarUsuarioAsociadoPageModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "mi-perfil",
    loadChildren: "./pages/mi-perfil/mi-perfil.module#MiPerfilPageModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "terminosycondiciones",
    loadChildren:
      "./pages/terminosycondiciones/terminosycondiciones.module#TerminosycondicionesPageModule",
  },
  {
    path: "olvido-contrasena",
    loadChildren:
      "./pages/olvido-contrasena/olvido-contrasena.module#OlvidoContrasenaPageModule",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
