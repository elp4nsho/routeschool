import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  host = environment.host

  constructor(private _http:HttpClient) { }

  iniciarViaje(datos){
    let access_token = localStorage.getItem('access_token');
    console.log(access_token);
    return this._http.post(this.host+'/viaje/iniciar', datos,{
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    });
  }
  terminarViaje(datos,id){
    let access_token = localStorage.getItem('access_token');
    console.log(access_token);
    return this._http.post(this.host+'/viaje/terminar/'+id, datos,{
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    });
  }
}
