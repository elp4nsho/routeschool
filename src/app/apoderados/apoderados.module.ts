import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApoderadosPageRoutingModule } from './apoderados-routing.module';
import {ApoderadoService} from '../services/apoderado.service';
import { ApoderadosPage } from './apoderados.page';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ColegiosService} from '../services/colegios.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApoderadosPageRoutingModule
  ],
  declarations: [ApoderadosPage],
  providers:[ApoderadoService,ColegiosService,SocialSharing]
})
export class ApoderadosPageModule {}
