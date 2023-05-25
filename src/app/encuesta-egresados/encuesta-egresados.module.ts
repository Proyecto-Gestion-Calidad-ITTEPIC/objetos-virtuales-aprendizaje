import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestaEgresadosPageRoutingModule } from './encuesta-egresados-routing.module';

import { EncuestaEgresadosPage } from './encuesta-egresados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EncuestaEgresadosPageRoutingModule
  ],
  declarations: [EncuestaEgresadosPage]
})
export class EncuestaEgresadosPageModule {}
