import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  host = environment.host;
  constructor(private _http:HttpClient) { }


  obtenerAsistenciaPorDia(fecha){
    let access_token = localStorage.getItem('access_token');
    console.log(access_token);
    return this._http.get(this.host+'/transportista/asistentes/'+fecha, {
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    });
  }




}
