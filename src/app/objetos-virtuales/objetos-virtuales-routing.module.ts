import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjetosVirtualesPage } from './objetos-virtuales.page';

const routes: Routes = [
  {
    path: '',
    component: ObjetosVirtualesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObjetosVirtualesPageRoutingModule {}
