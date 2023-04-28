import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncuestaEmpleadorPageRoutingModule } from './encuesta-empleador-routing.module';

import { EncuestaEmpleadorPage } from './encuesta-empleador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EncuestaEmpleadorPageRoutingModule
  ],
  declarations: [EncuestaEmpleadorPage]
})
export class EncuestaEmpleadorPageModule {}
