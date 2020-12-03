import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminarRegistroPageRoutingModule } from './terminar-registro-routing.module';

import { TerminarRegistroPage } from './terminar-registro.page';
import {LoginService} from '../services/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminarRegistroPageRoutingModule
  ],
  declarations: [TerminarRegistroPage],
  providers:[LoginService]
})
export class TerminarRegistroPageModule {}
