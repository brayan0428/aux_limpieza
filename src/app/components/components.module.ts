import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FabWhatsappComponent } from './fab-whatsapp/fab-whatsapp.component';
import { MenuComponent } from './menu/menu.component';
import { TitlePageComponent } from './title-page/title-page.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FabWhatsappComponent,
    MenuComponent,
    TitlePageComponent
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    FabWhatsappComponent,
    MenuComponent,
    TitlePageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
