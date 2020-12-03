import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApoderadoPageRoutingModule } from './apoderado-routing.module';

import { ApoderadoPage } from './apoderado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApoderadoPageRoutingModule
  ],
  declarations: [ApoderadoPage]
})
export class ApoderadoPageModule {}
