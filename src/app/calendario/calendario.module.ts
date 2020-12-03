import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CalendarioPageRoutingModule} from './calendario-routing.module';

import {CalendarioPage} from './calendario.page';
import {CalendarModule} from 'ion2-calendar';
import {AsistenciaService} from '../services/asistencia.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CalendarModule,
        IonicModule,
        CalendarioPageRoutingModule
    ],
    declarations: [CalendarioPage], providers: [AsistenciaService]
})
export class CalendarioPageModule {
}
