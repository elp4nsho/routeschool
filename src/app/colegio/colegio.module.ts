import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColegioPageRoutingModule } from './colegio-routing.module';

import { ColegioPage } from './colegio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColegioPageRoutingModule
  ],
  declarations: [ColegioPage]
})
export class ColegioPageModule {}
