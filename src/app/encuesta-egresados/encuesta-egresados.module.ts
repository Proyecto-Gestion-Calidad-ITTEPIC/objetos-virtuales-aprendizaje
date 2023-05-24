import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestaEgresadosPageRoutingModule } from './encuesta-egresados-routing.module';

import { EncuestaEgresadosPage } from './encuesta-egresados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncuestaEgresadosPageRoutingModule
  ],
  declarations: [EncuestaEgresadosPage]
})
export class EncuestaEgresadosPageModule {}
