import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ColegiosService {

    host = environment.host;

    constructor(private _http: HttpClient) {
    }

    obtenerColegios() {
        let access_token = localStorage.getItem('access_token');
        return this._http.get(this.host+'/colegio/' +
            '', {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });
    }

    crearColegio(colegio) {
        let access_token = localStorage.getItem('access_token');
        console.log(access_token);
        return this._http.post(this.host+'/colegio/', colegio, {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });
    }

    crearLinkRegistro() {
        let access_token = localStorage.getItem('access_token');
        console.log(access_token);
        return this._http.get(this.host+'/link/', {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });
    }

    eliminarColegio(idColegio){
        let access_token = localStorage.getItem('access_token');
        console.log(access_token);
        return this._http.delete(this.host+'/colegio/'+idColegio, {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });
    }
    obtenerNinosPorColegio(idColegio){
        let access_token = localStorage.getItem('access_token');
        console.log(access_token);
        return this._http.get(this.host+'/transportista/ninos/'+idColegio, {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });
    }
    editarColegio(colegio){
        let access_token = localStorage.getItem('access_token');
        console.log(access_token);
        return this._http.patch(this.host+'/colegio/'+colegio.idColegio,colegio, {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });
    }



}
