import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs-page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../home/home.module#HomePageModule'
                    }
                ]
            },
            {
                path: 'colegios',
                children: [
                    {
                        path: '',
                        loadChildren: '../colegios/colegios.module#ColegiosPageModule'
                    }
                ]
            }, {
                path: 'calendario',
                children: [
                    {
                        path: '',
                        loadChildren: '../calendario/calendario.module#CalendarioPageModule'
                    }
                ]
            }, {
                path: 'modoviaje',
                children: [
                    {
                        path: '',
                        loadChildren: '../modo-ruta/modo-ruta.module#ModoRutaPageModule'
                    }
                ]
            }, {
                path: 'prioridadviaje',
                children: [
                    {
                        path: '',
                        loadChildren: '../viaje-prioridad/viaje-prioridad.module#ViajePrioridadPageModule'
                    }
                ]
            },
            {
                path: 'add-colegio',
                children: [
                    {
                        path: '',
                        loadChildren: '../add-colegio/add-colegio.module#AddColegioPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/tabs/home',
                pathMatch: 'full'
            }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
