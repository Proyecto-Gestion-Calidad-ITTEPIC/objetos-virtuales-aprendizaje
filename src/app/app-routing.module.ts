import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'objetos-virtuales',
    loadChildren: () => import('./objetos-virtuales/objetos-virtuales.module').then( m => m.ObjetosVirtualesPageModule)
  },
  {
    path: 'pantalla-encuesta',
    loadChildren: () => import('./pantalla-encuesta/pantalla-encuesta.module').then( m => m.PantallaEncuestaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
