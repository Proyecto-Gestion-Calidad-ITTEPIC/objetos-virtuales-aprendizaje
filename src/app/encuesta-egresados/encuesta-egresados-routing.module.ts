import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncuestaEgresadosPage } from './encuesta-egresados.page';

const routes: Routes = [
  {
    path: '',
    component: EncuestaEgresadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuestaEgresadosPageRoutingModule {}
