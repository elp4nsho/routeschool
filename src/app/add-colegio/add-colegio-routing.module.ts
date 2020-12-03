import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddColegioPage } from './add-colegio.page';

const routes: Routes = [
  {
    path: '',
    component: AddColegioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddColegioPageRoutingModule {}
