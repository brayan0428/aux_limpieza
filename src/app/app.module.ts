import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import {HttpClientModule} from '@angular/common/http';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import {File} from '@ionic-native/File/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ComponentsModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DocumentViewer,
    File,
    FileOpener,
    FileTransfer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
