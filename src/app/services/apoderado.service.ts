import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApoderadoService {

  constructor(private _http:HttpClient) { }


  obtenerApoderados(){
    let access_token = localStorage.getItem('access_token');
    return this._http.get(environment.host+"/transportista/apoderados",{  headers: {
        Authorization: 'Bearer ' + access_token
      }})
  }

  eliminar(apoderado){
    let access_token = localStorage.getItem('access_token');
    console.log(apoderado)
    return this._http.delete(environment.host+"/transportista/apoderado/"+apoderado.rutAp,{  headers: {
        Authorization: 'Bearer ' + access_token
      }})
  }


}
