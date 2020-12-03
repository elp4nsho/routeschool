/*
import {Component, OnInit} from '@angular/core';
import {CalendarModule} from 'ion2-calendar';
import {AsistenciaService} from '../services/asistencia.service';

@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.page.html',
    styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
    date: string;
    type: 'string';
    listaNinos = []

    constructor(private asistenciaService:AsistenciaService) {
    }

    onChange($event) {
        console.log($event);
        this.asistenciaService.obtenerAsistenciaPorDia(this.date).subscribe((okDatos:any)=>{
          this.listaNinos = okDatos.response
        })
    }

    ngOnInit(): void {
    }


}
*/
