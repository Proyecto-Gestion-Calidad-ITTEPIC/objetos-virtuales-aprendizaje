import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjetosVirtualesPageRoutingModule } from './objetos-virtuales-routing.module';

import { ObjetosVirtualesPage } from './objetos-virtuales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjetosVirtualesPageRoutingModule
  ],
  declarations: [ObjetosVirtualesPage]
})
export class ObjetosVirtualesPageModule {}
