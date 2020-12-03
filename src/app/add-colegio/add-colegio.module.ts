import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddColegioPageRoutingModule } from './add-colegio-routing.module';

import { AddColegioPage } from './add-colegio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddColegioPageRoutingModule
  ],
  declarations: [AddColegioPage]
})
export class AddColegioPageModule {}
