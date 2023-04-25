import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncuestaEmpleadorPage } from './encuesta-empleador.page';

const routes: Routes = [
  {
    path: '',
    component: EncuestaEmpleadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuestaEmpleadorPageRoutingModule {}
