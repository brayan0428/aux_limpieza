import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
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
    path: "servicios-limpieza",
    loadChildren:
      "./pages/servicios-limpieza/servicios-limpieza.module#ServiciosLimpiezaPageModule"
  },
  {
    path: "servicios-cocina",
    loadChildren:
      "./pages/servicios-cocina/servicios-cocina.module#ServiciosCocinaPageModule"
  },
  {
    path: "servicios-cuidado-de-ninos",
    loadChildren:
      "./pages/servicios-cuidado-de-ninos/servicios-cuidado-de-ninos.module#ServiciosCuidadoDeNinosPageModule"
  },
  {
    path: "servicios-acompanamiento-adulto-mayor",
    loadChildren:
      "./pages/servicios-acompanamiento-adulto-mayor/servicios-acompanamiento-adulto-mayor.module#ServiciosAcompanamientoAdultoMayorPageModule"
  },
  {
    path: "servicios-especiales",
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
    path: "se-plomeros",
    loadChildren: "./pages/se-plomeros/se-plomeros.module#SePlomerosPageModule"
  },
  {
    path: "se-aires-acondicionados",
    loadChildren:
      "./pages/se-aires-acondicionados/se-aires-acondicionados.module#SeAiresAcondicionadosPageModule"
  },
  {
    path: "se-albaniles",
    loadChildren:
      "./pages/se-albaniles/se-albaniles.module#SeAlbanilesPageModule"
  },
  {
    path: "se-cerrajeros",
    loadChildren:
      "./pages/se-cerrajeros/se-cerrajeros.module#SeCerrajerosPageModule"
  },
  {
    path: "se-diseno-interiores",
    loadChildren:
      "./pages/se-diseno-interiores/se-diseno-interiores.module#SeDisenoInterioresPageModule"
  },
  {
    path: "se-electricistas",
    loadChildren:
      "./pages/se-electricistas/se-electricistas.module#SeElectricistasPageModule"
  },
  {
    path: "se-enfermeros",
    loadChildren:
      "./pages/se-enfermeros/se-enfermeros.module#SeEnfermerosPageModule"
  },
  {
    path: "se-jardineros",
    loadChildren:
      "./pages/se-jardineros/se-jardineros.module#SeJardinerosPageModule"
  },
  {
    path: "se-mecanicos",
    loadChildren:
      "./pages/se-mecanicos/se-mecanicos.module#SeMecanicosPageModule"
  },
  {
    path: "registro-proveedores",
    loadChildren:
      "./pages/registro-proveedores/registro-proveedores.module#RegistroProveedoresPageModule"
  },
  {
    path: "solicitud-servicio",
    loadChildren:
      "./pages/solicitud-servicio/solicitud-servicio.module#SolicitudServicioPageModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
