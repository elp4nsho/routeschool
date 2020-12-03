import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Papa} from 'ngx-papaparse';
import {Platform} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {File} from '@ionic-native/file/ngx';

@Component({
    selector: 'app-viajes',
    templateUrl: './viajes.page.html',
    styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
    host = environment.host;
    csvData: any = [];
    headerRow: any = [];
    mes: any = '';
    anio: any = '';
    dataParseada:any = {};
    hoyMes
    registrosSinFin = false;
    dataParseadaFront :any = []
    dataParseadaFrontAux :any = []
    selectValueMes: any;
    constructor(private _http: HttpClient, private papa: Papa,private socialSharing:SocialSharing, private file:File,private plt: Platform) {
        this.hoyMes=new Date().getMonth()+1
        console.log(this.hoyMes)
        this.selectValueMes = this.hoyMes.toString()
    }

    ngOnInit() {

        this.mes = new Date().getMonth() + 1;
        this.anio = new Date().getFullYear();
        this.loadCsv(this.mes, this.anio);
    }

    cambiarRegistros(){
        if(this.registrosSinFin){
            this.dataParseadaFront = this.dataParseadaFrontAux.filter(d=>d.estado == 'Terminado')
        }else{
            this.dataParseadaFront = this.dataParseadaFrontAux


        }
    }




    loadCsv(mes, anio) {
        this._http.get(this.host + '/viaje/datos/' + anio + '/' + mes, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-type': 'application/json'
            },
        }).subscribe((ok: any) => {
            ok = ok.response;
            console.log(ok)
            this.dataParseada = (ok.map(o=>{
                let fechaInicioViaje:any = new Date(o.fechaInicio);
                let fechaTerminoViaje:any = new Date(o.fechaTermino);

                return {
                    dia:o.dia,
                    horaDeInicio:`${fechaInicioViaje.getHours()}:${fechaInicioViaje.getMinutes()}:${fechaInicioViaje.getSeconds()}`,
                    horaDeTermino:o.fechaTermino != null ? `${fechaTerminoViaje.getHours()}:${fechaTerminoViaje.getMinutes()}:${fechaTerminoViaje.getSeconds()}`:'Termino no informado',
                    duracion:o.fechaTermino != null ? `${(((fechaTerminoViaje-fechaInicioViaje) / 1000)/60).toFixed(0)} mins ${(((fechaTerminoViaje-fechaInicioViaje) / 1000) % 60 ).toFixed(0)} seg`:'No se puede calcular',
                    estado:o.estado == 0 ? 'No terminado':'Terminado',
                    asistentesEsperados:o.detalleViaje.length,
                    asistentesReales:o.detalleViaje.filter(aR=>aR.asistio == 1).length,
                    inasistentes:o.detalleViaje.filter(aR=>aR.asistio == 0).length,
                    asistentesDetalles:o.detalleViaje.filter(aR=>aR.asistio == 1).map(as=>`${as.nino.nombre} ${as.nino.apellidoPaterno} ${as.nino.apellidoMaterno || ''}`).join(";"),
                    inasistentesDetalles:o.detalleViaje.filter(aR=>aR.asistio == 0).map(as=>`${as.nino.nombre} ${as.nino.apellidoPaterno} ${as.nino.apellidoMaterno || ''}`).join(";")

                }
            }));
            this.dataParseadaFront = this.dataParseada.map(dP =>{
                return {
                    dia:dP.dia,
                    horaDeInicio:dP.horaDeInicio,
                    horaDeTermino:dP.horaDeTermino,
                    duracion:dP.duracion,
                    estado:dP.estado,
                    asistentesReales:dP.asistentesReales,
                    inasistentes:dP.inasistentes,
                    nAsistentes:dP.asistentesDetalles,
                    ninasistentes:dP.inasistentesDetalles
                }
            })
            this.dataParseadaFrontAux = [...this.dataParseadaFront]
        }, error => alert(error));
    }

    ConvertToCSV(objArray, headerList) {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = 'S.No,';
        for (let index in headerList) {
            row += headerList[index] + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for (let i = 0; i < array.length; i++) {
            let line = (i + 1) + '';
            for (let index in headerList) {
                let head = headerList[index];
                line += ',' + array[i][head];
            }
            str += line + '\r\n';
        }
        return str;
    }

    extractData(res) {

        console.log(res);
        console.log(this.ConvertToCSV(res, ["dia","estado","horaDeInicio","horaDeTermino","duracion","asistentesEsperados","asistentesReales","inasistentes","asistentesDetalles","inasistentesDetalles"]));
        //let csvData = res || '';
        let csvData = this.ConvertToCSV(res, ["dia","estado","horaDeInicio","horaDeTermino","duracion","asistentesEsperados","asistentesReales","inasistentes","asistentesDetalles","inasistentesDetalles"]);

        this.papa.parse(csvData, {
            complete: parsedData => {
                this.headerRow = parsedData.data.splice(0, 1)[0];
                this.csvData = parsedData.data;
                console.log('parsed data');
                console.log(parsedData);
            }
        });


    }

    exportCSV() {
        if(this.registrosSinFin){
            this.extractData(this.dataParseada.filter(d=>d.estado == 'Terminado'));

        }else{
            this.extractData(this.dataParseada);

        }

        let csv = this.papa.unparse({
            fields: this.headerRow,
            data: this.csvData
        });
        console.log('csv: ' + csv);
        if (this.plt.is('cordova')) {
            this.file.writeFile(this.file.dataDirectory,'Viajes.csv',csv,{replace:true}).then((res:any)=>{
                this.socialSharing.share(null,null,res.nativeURL,null)
            })

        } else {
            var blob = new Blob([csv]);
            var a = window.document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'registros.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

}
