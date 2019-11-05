import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { SolicitudServicioPage } from "./solicitud-servicio.page";
import { ComponentsModule } from "../../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: SolicitudServicioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [SolicitudServicioPage]
})
export class SolicitudServicioPageModule {}
