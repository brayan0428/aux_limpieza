import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { FabWhatsappComponent } from "./fab-whatsapp/fab-whatsapp.component";
import { MenuComponent } from "./menu/menu.component";
import { TitlePageComponent } from "./title-page/title-page.component";
import { BackButtonComponent } from "./back-button/back-button.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FabWhatsappComponent,
    MenuComponent,
    TitlePageComponent,
    BackButtonComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FabWhatsappComponent,
    MenuComponent,
    TitlePageComponent,
    BackButtonComponent
  ],
  imports: [CommonModule, IonicModule, RouterModule]
})
export class ComponentsModule {}
