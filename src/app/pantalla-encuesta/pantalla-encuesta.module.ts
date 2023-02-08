import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PantallaEncuestaPageRoutingModule } from './pantalla-encuesta-routing.module';

import { PantallaEncuestaPage } from './pantalla-encuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PantallaEncuestaPageRoutingModule
  ],
  declarations: [PantallaEncuestaPage]
})
export class PantallaEncuestaPageModule {}
