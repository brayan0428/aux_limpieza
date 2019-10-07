import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServiciosAcompanamientoAdultoMayorPage } from './servicios-acompanamiento-adulto-mayor.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ServiciosAcompanamientoAdultoMayorPage
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
  declarations: [ServiciosAcompanamientoAdultoMayorPage]
})
export class ServiciosAcompanamientoAdultoMayorPageModule {}
