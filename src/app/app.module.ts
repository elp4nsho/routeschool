import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//firebase config
import { AngularFirestoreModule } from "@angular/fire/firestore"; //Modulo Firestore (BD)
import { AngularFireAuthModule } from "@angular/fire/auth";  //Modulo de authenticacion
import { AngularFireModule } from "@angular/fire";            //Modulo para inicializar y que todo funcione bien vergas
import { firebaseConfig} from "../environments/environment";     // aqui se encuentra una variable de configuracion para inicializar firebase
import {GooglePlus} from '@ionic-native/google-plus/ngx'
import { Facebook } from '@ionic-native/facebook/ngx';
import {LaModalComponent} from './la-modal/la-modal.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent,LaModalComponent],
  entryComponents: [    LaModalComponent],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    LaModalComponent,
    SplashScreen,
    GooglePlus,
    Facebook,
    HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
