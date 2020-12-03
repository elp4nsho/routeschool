import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModoRutaPage } from './modo-ruta.page';

const routes: Routes = [
  {
    path: '',
    component: ModoRutaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModoRutaPageRoutingModule {}
