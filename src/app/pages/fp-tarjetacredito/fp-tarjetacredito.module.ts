import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FpTarjetacreditoPage } from './fp-tarjetacredito.page';

const routes: Routes = [
  {
    path: '',
    component: FpTarjetacreditoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FpTarjetacreditoPage]
})
export class FpTarjetacreditoPageModule {}
