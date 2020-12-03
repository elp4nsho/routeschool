import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminarRegistroPage } from './terminar-registro.page';

const routes: Routes = [
  {
    path: '',
    component: TerminarRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminarRegistroPageRoutingModule {}
