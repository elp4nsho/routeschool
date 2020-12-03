import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  {
    path: 'app',
    loadChildren: () => import('./tabs-page/tabs-page.module').then( m => m.TabsModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }/*,

  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  }*/,
  {
    path: 'colegio',
    loadChildren: () => import('./colegio/colegio.module').then( m => m.ColegioPageModule)
  },
  {
    path: 'add-colegio',
    loadChildren: () => import('./add-colegio/add-colegio.module').then( m => m.AddColegioPageModule)
  },

  {
    path: 'colegios',
    loadChildren: () => import('./colegios/colegios.module').then( m => m.ColegiosPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'modo-ruta',
    loadChildren: () => import('./modo-ruta/modo-ruta.module').then( m => m.ModoRutaPageModule)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./viajes/viajes.module').then( m => m.ViajesPageModule)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./viajes/viajes.module').then( m => m.ViajesPageModule)
  },
  {
    path: 'viaje-prioridad',
    loadChildren: () => import('./viaje-prioridad/viaje-prioridad.module').then( m => m.ViajePrioridadPageModule)
  },  {
    path: 'completar-registro',
    loadChildren: () => import('./completar-registro/completar-registro.module').then( m => m.CompletarRegistroPageModule)
  },
  {
    path: 'terminar-registro',
    loadChildren: () => import('./terminar-registro/terminar-registro.module').then( m => m.TerminarRegistroPageModule)
  },
  {
    path: 'apoderados',
    loadChildren: () => import('./apoderados/apoderados.module').then( m => m.ApoderadosPageModule)
  },
  {
    path: 'apoderado',
    loadChildren: () => import('./apoderado/apoderado.module').then( m => m.ApoderadoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
