import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajePrioridadPageRoutingModule } from './viaje-prioridad-routing.module';

import { ViajePrioridadPage } from './viaje-prioridad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajePrioridadPageRoutingModule
  ],
  declarations: [ViajePrioridadPage]
})
export class ViajePrioridadPageModule {}
