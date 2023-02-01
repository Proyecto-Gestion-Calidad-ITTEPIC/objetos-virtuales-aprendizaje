import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PantallaEncuestaPage } from './pantalla-encuesta.page';

const routes: Routes = [
  {
    path: '',
    component: PantallaEncuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PantallaEncuestaPageRoutingModule {}
