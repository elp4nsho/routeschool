import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IonicModule } from '@ionic/angular';

import { ModoRutaPageRoutingModule } from './modo-ruta-routing.module';

import { ModoRutaPage } from './modo-ruta.page';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://approuteschool.ddns.net:3000', options: {} };
/*
const config: SocketIoConfig = { url: 'http://192.168.1.82:30001', options: {} };
*/
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    IonicModule,
    ModoRutaPageRoutingModule
  ],
  declarations: [ModoRutaPage],
  providers:[Geolocation,LocationAccuracy]
})
export class ModoRutaPageModule {}
