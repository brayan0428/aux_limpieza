import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" ,canActivate:[AuthGuardService]},
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "registro",
    loadChildren: "./pages/registro/registro.module#RegistroPageModule"
  },
  {
    path: "solicitar-servicio",
    loadChildren:
      "./pages/solicitar-servicio/solicitar-servicio.module#SolicitarServicioPageModule"
  },
  {
    path: "servicios-especiales/:id",
    loadChildren:
      "./pages/servicios-especiales/servicios-especiales.module#ServiciosEspecialesPageModule"
  },
  {
    path: "lista-de-precios",
    loadChildren:
      "./pages/lista-de-precios/lista-de-precios.module#ListaDePreciosPageModule"
  },
  {
    path: "mis-servicios",
    loadChildren:
      "./pages/mis-servicios/mis-servicios.module#MisServiciosPageModule"
  },
  {
    path: "registro-proveedores",
    loadChildren:
      "./pages/registro-proveedores/registro-proveedores.module#RegistroProveedoresPageModule"
  },
  {
    path: "solicitud-servicio/:servicio",
    loadChildren:
      "./pages/solicitud-servicio/solicitud-servicio.module#SolicitudServicioPageModule",
    canActivate:[AuthGuardService]
  },
  {
    path: "grupos-servicios-especiales",
    loadChildren:
      "./pages/grupos-servicios-especiales/grupos-servicios-especiales.module#GruposServiciosEspecialesPageModule"
  },
  { path: 'confirmar-solicitud', loadChildren: './pages/confirmar-solicitud/confirmar-solicitud.module#ConfirmarSolicitudPageModule',
  canActivate:[AuthGuardService] },
  { path: 'proveedores/:especialidad', loadChildren: './pages/proveedores/proveedores.module#ProveedoresPageModule' },  { path: 'fp-tarjetacredito', loadChildren: './pages/fp-tarjetacredito/fp-tarjetacredito.module#FpTarjetacreditoPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
