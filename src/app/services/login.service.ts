import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private _http: HttpClient) {
    }
    host = environment.host;

    verificarRegistro() {
        let access_token = localStorage.getItem('access_token');

        return this._http.get(this.host+'/transportista/verificar', {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });
    }
   terminarRegistro(data) {
        let access_token = localStorage.getItem('access_token');

        return this._http.post(this.host+'/transportista/registrar', data,{
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });
    }


}
