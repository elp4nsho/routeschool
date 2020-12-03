/*
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoadingController, Platform, ToastController} from '@ionic/angular';
import {AsistenciaService} from '../services/asistencia.service';
import {ColegiosService} from '../services/colegios.service';
import {LoginService} from '../services/login.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
    selector: 'app-modo-ruta',
    templateUrl: './modo-ruta.page.html',
    styleUrls: ['./modo-ruta.page.scss'],
})
export class ModoRutaPage implements OnInit {

    aparecerMapa = false;
    lmap;
    marker: any = {};
    transportista: any = {};
    @ViewChild('mapElement', {static: false}) mapElement;
    @ViewChild('rightPanel', {static: false}) rightPanel;
    directionService = new google.maps.DirectionsService;
    directionDisplay = new google.maps.DirectionsRenderer;
    loading: any;
    listaNinos = [];
    rutas = [];
    indice = 0;
    posInicial: any = {};
    selectedPos = 'casaT';
    rutaTotal = [];


    constructor(
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public loginService: LoginService,
        private asistenciaService: AsistenciaService,
        private geolocation: Geolocation,
        private colegioService: ColegiosService,
        private platform: Platform
    ) {
    }

    anterior() {
        //this.directionDisplay.setDirections(this.rutas[this.indice]);
        if (this.destinoIndex == 0) {
            this.destinoIndex = this.destinos.length - 1;
        } else {
            this.destinoIndex -= 1;
        }
        console.log(this.destinos[this.destinoIndex]);
        this.directionDisplay.setDirections(this.destinos[this.destinoIndex]);

    }

    crearMarker(pos){
       /!* const marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            map: map,
        });*!/
    }



    siguiente() {
        if (this.destinoIndex == this.destinos.length - 1) {
            this.destinoIndex = 0;
        } else {
            this.destinoIndex += 1;
        }
        console.log(this.destinos[this.destinoIndex]);
        console.log(this.destinos[this.destinoIndex].routes[0].legs[0].steps[0].path);
        console.log(this.destinos);
        console.log(this.lmap);

        const flightPath = new google.maps.Polyline({
            path: this.destinos[this.destinoIndex].routes[0].legs[0].steps[0].path,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        flightPath.setMap(this.lmap);

        this.directionDisplay.setDirections(this.destinos[this.destinoIndex]);

    }





    async ngOnInit() {
        // Debido ngOnInit() inicia antes del evento
        // deviceready, debemos detectar cuando este evento se
        // ejecute para en ese momento cargar nuestro mapa sin problema alguno
        await this.platform.ready();
        console.log(google);
        console.log(google.maps);
        const lmap = new google.maps.Map(
            this.mapElement.nativeElement, {
                center: {lat: -34.397, lng: 150.644},
                zoom: 15
            }
        );
        let mark = new google.maps.Marker({
            position: {lat: -34.397, lng: 150.644},
            map: lmap,
            title: 'Test'
        });

        this.marker = mark;
        this.lmap = lmap;

        /!*       const infoWindow = new google.maps.InfoWindow;
               const pos = {
                   lat: -33.450550,
                   lng: -70.625421
               };
               infoWindow.setPosition(pos);
               infoWindow.setContent('GOLA');
               infoWindow.open(lmap);
       *!/
        this.directionDisplay.setMap(lmap);
        this.directionDisplay.setPanel(this.rightPanel.nativeElement);

        /!*  lmap.animateCamera({
              target: {
                  lat: -33.450550,
                  lng: -70.625421
              },
              zoom: 17,
              tilt: 30
          });*!/
        /!*  await this.loadMap();
          DirectionsService.route({
              origin:"Santiago chile baquedano",
              destination:"Santiago chile cal y canto",
              travelMode:'DRIVING'
          }
          ).then(ok=>{
              console.log(ok)
              this.directionDisplay.setDirections(ok)

          })*!/
    }

    centrar() {
        this.lmap.animateCamera({
            target: {
                lat: -33.450550,
                lng: -70.625421
            },
            zoom: 17,
            tilt: 30
        });
    }

    eliminar(este) {
        if (confirm('¿Estas seguro que deseas eliminar este punto?')) {
            console.log(este);
            this.listaNinos = this.listaNinos.filter(d => {
                if (d.rutN) {
                    return d.rutN != este.rutN;
                } else if (d.idColegio) {
                    return d.idColegio != este.idColegio;
                }
            });

            console.log(this.listaNinos);

        }
    }


    hacerZoom(pos) {

        console.log(this.lmap);
        console.log(this.lmap.setCameraTarget);
        this.lmap.setZoom(15);
        this.lmap.panTo({lat: pos.coords.latitude, lng: pos.coords.longitude});
    }

    i = 0;

    laMarker() {
        console.log(this.posInicial);
        console.log(this.posInicial.split(',')[0]);
        console.log(this.posInicial.split(',')[1]);
        this.cambiarPosicion({lat: parseFloat(this.posInicial.split(',')[0]), lng: parseFloat(this.posInicial.split(',')[1])});
    }

    cambiarPosicion(pos) {
        console.log(pos);
        this.marker.setPosition(pos);

    }

    centrarActual() {
        return new Promise((ok, nok) => {


            this.geolocation.getCurrentPosition().then((pos: any) => {
                this.posInicial = pos.coords.latitude + ',' + pos.coords.longitude;
                console.log(pos.coords);
                this.cambiarPosicion({lat: parseFloat(this.posInicial.split(',')[0]), lng: parseFloat(this.posInicial.split(',')[1])});
                this.hacerZoom(pos);
                ok(pos);

            });


        });
    }


    get destino(){
        try{
            return JSON.stringify(this.rutaTotal[this.destinoIndex].nombre)

        }catch (e) {

            return JSON.stringify(this.rutaTotal[this.destinoIndex])

        }
    }


    crearDireccion(originPos, destinationPos) {
        return new Promise((ok, nok) => {
            this.directionService.route({
                origin: destinationPos,
                destination: originPos,
                //destination: {lat: -33.463096, lng: -70.613747},
                travelMode: 'DRIVING'
            }, (re, st) => {
                if (st === 'OK') {
                    //this.directionDisplay.setDirections(re);
                    ok(re);
                } else {
                    alert(st);
                    alert(re);
                    nok(st);
                }
            });
        });

    }

    destinos = [];
    destinoIndex = 0;

    calculateAndDisplay() {
        this.aparecerMapa = !this.aparecerMapa;
        const that = this;
        this.rutaTotal = [];
        if (this.selectedPos === 'casaT') {
            console.log('seleccionado casa');

            this.rutaTotal.push({direccion: this.transportista.direccion});

        } else {
            console.log('seleccionado pos actual');

            this.rutaTotal.push({direccion: this.posInicial});
        }

        this.rutaTotal.push(...this.listaNinos);
        console.log(this.rutaTotal);
        let ss = this.rutaTotal.map(d => d.direccion);
        console.log(ss);

        /!*ss.forEach(o=>{
            console.log("calculcar")
            console.log(o)
        })*!/
        this.destinos = [];


        let ori = {lat: parseFloat("-33.432994,-70.654847".split(',')[0]), lng: parseFloat("-33.432994,-70.654847".split(',')[1])};
        let des = {lat: parseFloat("-33.424051,-70.661968".split(',')[0]), lng: parseFloat("-33.424051,-70.661968".split(',')[1])};
        this.crearDireccion(ori, des).then(okDir => {
            this.destinos.push(okDir);
        });
     /!*   for (let i = 0; i < ss.length; i++) {

            if (i == ss.length - 1) {
                /!* console.log("calcular")
                 console.log(ss[i])
                 console.log(ss[i+1])*!/

            } else {
                console.log('calcular');
                console.log(ss[i]);
                console.log(ss[i + 1]);
                let ori = {lat: parseFloat(ss[i].split(',')[0]), lng: parseFloat(ss[i].split(',')[1])};
                let des = {lat: parseFloat(ss[i + 1].split(',')[0]), lng: parseFloat(ss[i + 1].split(',')[1])};

                this.crearDireccion(ori, des).then(okDir => {
                    this.destinos.push(okDir);
                });

                //this.destinos.push({ori,des});
            }
        }*!/
        this.centrarActual().then(ok => {
            //this.rutaTotal.shift()
            /!*this.directionService.route({
                origin: this.posInicial,
                destination: ss[1],
                //destination: {lat: -33.463096, lng: -70.613747},
                travelMode: 'DRIVING'
            }, (re, st) => {
                if (st === 'OK') {
                    this.directionDisplay.setDirections(re);
                } else {
                    alert(st);
                    alert(re);
                }
            });*!/

        });
        console.log(this.destinos);


    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    ionViewWillEnter() {
        console.log('hoy');
        console.log(this.formatDate(new Date()));

        this.geolocation.getCurrentPosition().then((pos: any) => {
            this.posInicial = pos.coords.latitude + ',' + pos.coords.longitude;
            console.log(pos.coords);
        });

        this.loginService.verificarRegistro().subscribe((okTransportista: any) => {
            this.transportista = okTransportista.response;
            console.log(this.transportista);
        });


        this.asistenciaService.obtenerAsistenciaPorDia(this.formatDate(new Date())).subscribe((okAsi: any) => {

            this.colegioService.obtenerColegios().subscribe((okColegios: any) => {
                this.listaNinos = okAsi.response;

                console.log(this.listaNinos);
                console.log(okColegios.response);
                for (let o of okColegios.response) {
                    this.listaNinos.push(o);
                }
                //this.calculateAndDisplay();

            });


        });

    }

}
*/
