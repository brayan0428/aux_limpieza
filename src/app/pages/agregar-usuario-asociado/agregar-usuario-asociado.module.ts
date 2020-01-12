import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AgregarUsuarioAsociadoPage } from "./agregar-usuario-asociado.page";
import { ComponentsModule } from "src/app/components/components.module";

const routes: Routes = [
  {
    path: "",
    component: AgregarUsuarioAsociadoPage
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
  declarations: [AgregarUsuarioAsociadoPage]
})
export class AgregarUsuarioAsociadoPageModule {}
