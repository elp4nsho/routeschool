import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajePrioridadPage } from './viaje-prioridad.page';

const routes: Routes = [
  {
    path: '',
    component: ViajePrioridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajePrioridadPageRoutingModule {}
