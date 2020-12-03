import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {AsistenciaService} from '../services/asistencia.service';
import {ColegiosService} from '../services/colegios.service';
import {LoginService} from '../services/login.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Socket} from 'ngx-socket-io';
import {ViajeService} from '../services/viaje.service';
import {Router} from '@angular/router';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

declare var google;

@Component({
    selector: 'app-modo-ruta',
    templateUrl: './modo-ruta.page.html',
    styleUrls: ['./modo-ruta.page.scss'],
})
export class ModoRutaPage implements OnInit {
    slideOpts = {
        initialSlide: 1,
        speed: 400
    };


    @ViewChild('mapElement', {static: false}) mapElement;
    @ViewChild('rightPanel', {static: false}) rightPanel;
    directionService = new google.maps.DirectionsService;
    directionDisplay = new google.maps.DirectionsRenderer;
    loading: any;
    googleMapa: any;

    modoViaje = false;

    vistaDePosicionActual = true;
    vistaDePosiciones = false;
    vistaDeMapa = false;


    transportista: any = {};

    posicionActualCoordenadas: any = {};


    public destino = '';
    public tiempoRestanteDestino: any = {};
    public distanciaRestanteDestino: any = {};
    public mananaTarde = true;
    public fechaInicioViajeTimestamp: any = '';
    public instruccionActual = '';
    public pasoPoly: any = {};
    public transportistaPoly: any = {};
    public rutaEnteraPoly: any = {};
    public pasoCircle: any = {};
    public listaActualDePasos = [];
    public listaTotalDePuntos = [];
    public listaDeNinos = [];
    public listaDeColegios = [];
    public listaDePuntosSeleccionadosParaElViaje = [];
    public listaTotalDeDireccionesCreadas = [];

    public markerNinoProximo: any = {};
    public markerTransportista: any = {};


    public indexActualdeListaDeDirecciones = 0;
    public indexActualDeListaDePasos = 0;
    public posicionSeleccionada = 'current';
    public posicionSeleccionadaCoordenadas = {};

    constructor(
        public loadingCtrl: LoadingController,
        public router: Router,
        public toastCtrl: ToastController,
        public loginService: LoginService,
        public locationAccuracy: LocationAccuracy,
        private navCtrl: NavController,
        public viajeService: ViajeService,
        private socket: Socket,
        private asistenciaService: AsistenciaService,
        private geolocation: Geolocation,
        private colegioService: ColegiosService,
        private platform: Platform
    ) {
    }

//-33.459963, -70.655384

    async ngOnInit() {

        /*
           let posActual = await this.centrarMapa();
           this.crearMarker(posActual, 'yo');
           let direccion: any = await this.crearDireccion(posActual, {lat: -33.459963, lng: -70.655384});
           this.crearMarker({lat: -33.459963, lng: -70.655384}, 'nino');
           let rutaEnteraPoly;*/
        /*direccion.routes.forEach((r: any) => {
            console.log(r.overview_path);
            console.log(r);
            rutaEnteraPoly = this.crearPolyline(r.overview_path, '#FF0000');
            r.legs.forEach((leg: any) => {
                /!*leg.steps.forEach((step)=>{

                })*!/
                this.listaActualDePasos = leg.steps;
                this.pasoPoly = this.crearPolyline(leg.steps[0].path, '#27beff');
                this.pasoCircle = this.crearRadio(leg.steps[0].end_location);
                this.instruccionActual = leg.steps[0].instructions;
                console.log(this.pasoCircle.getBounds().contains(posActual));

                setInterval(() => {
                    this.aparecerYDesaparecer(this.pasoPoly);
                }, 2000);
                setInterval(() => {
                    this.aparecerYDesaparecerCircle(this.pasoCircle);
                }, 3000);

            });
        });*/

    }


    cargarTransportista() {
        this.loginService.verificarRegistro().subscribe((okTransportista: any) => {
            this.transportista = okTransportista.response;
            console.log(this.transportista);
            this.transportista.direccion = {
                lat: parseFloat(this.transportista['direccion'].split(',')[0]),
                lng: parseFloat(this.transportista['direccion'].split(',')[1])
            };
            console.log(this.transportista);

        });
    }

    pintarPaso(paso) {
        console.log(paso);
        this.instruccionActual = paso.instructions;
        this.pasoPoly.setMap(null);
        this.pasoPoly = this.crearPolyline(paso.path, '#27beff', 5, 5);
        this.pasoCircle.setMap(null);
        this.pasoCircle = this.crearRadio(paso.end_location);
    }


    anterior() {
        //this.directionDisplay.setDirections(this.rutas[this.indice]);
        if (this.indexActualDeListaDePasos == 0) {
            this.indexActualDeListaDePasos = this.listaActualDePasos.length - 1;
        } else {
            this.indexActualDeListaDePasos -= 1;
        }
        this.googleMapa.panTo(this.listaActualDePasos[this.indexActualDeListaDePasos].end_location);
        this.pintarPaso(this.listaActualDePasos[this.indexActualDeListaDePasos]);

    }


    siguiente() {
        if (this.indexActualDeListaDePasos == this.listaActualDePasos.length - 1) {
            this.siguienteD();
            this.indexActualDeListaDePasos = 0;
        } else {
            this.indexActualDeListaDePasos += 1;
        }
        console.log(this.listaActualDePasos[this.indexActualDeListaDePasos]);
        this.googleMapa.panTo(this.listaActualDePasos[this.indexActualDeListaDePasos].end_location);
        this.pintarPaso(this.listaActualDePasos[this.indexActualDeListaDePasos]);

    }

    anteriorD() {
        //this.directionDisplay.setDirections(this.rutas[this.indice]);
        if (this.indexActualdeListaDeDirecciones == 0) {
            this.indexActualdeListaDeDirecciones = this.listaDePuntosSeleccionadosParaElViaje.length - 1;
        } else {
            this.indexActualdeListaDeDirecciones -= 1;
        }
        this.googleMapa.panTo(this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].googleMapDirection.routes[0].legs[0].start_location);
        this.tiempoRestanteDestino = this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].googleMapDirection.routes[0].legs[0].duration;
        this.distanciaRestanteDestino = this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].googleMapDirection.routes[0].legs[0].distance;
        this.pintarDireccion(this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones]);

    }

    terminarViaje() {
        console.log(this.ninosAsistiendoLista);
        this.viajeService.terminarViaje(this.ninosAsistiendoLista, this.elIdViaje).subscribe(okViajeI => {
            console.log(okViajeI);
            location.reload();
        });


    }

    siguienteD() {
        if (this.indexActualdeListaDeDirecciones == this.listaDePuntosSeleccionadosParaElViaje.length - 1) {
            if (confirm('¿Desea finalizar el viaje?')) {
                this.terminarViaje();
            } else {
                this.indexActualdeListaDeDirecciones = 0;
            }
        } else {
            console.log('infodir');
            console.log(this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones]);
            if (!this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].esColegio) {
                if (confirm('¿el niño ' + this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].nombre + ' realmente asistio a clases?')) {
                    console.log(this.ninosAsistiendoLista);
                    let nRe = this.ninosAsistiendoLista.filter(n => n.nino.rutN == this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].rutN)[0];
                    this.ninosAsistiendoLista = this.ninosAsistiendoLista.filter(n => n.nino.rutN != this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].rutN);
                    nRe.asistio = 1;
                    this.ninosAsistiendoLista.push(nRe);

                } else {
                    console.log(this.ninosAsistiendoLista);
                    let nRe = this.ninosAsistiendoLista.filter(n => n.nino.rutN == this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].rutN)[0];
                    this.ninosAsistiendoLista = this.ninosAsistiendoLista.filter(n => n.nino.rutN != this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].rutN);
                    nRe.asistio = 0;
                    this.ninosAsistiendoLista.push(nRe);
                }
            }

            this.indexActualdeListaDeDirecciones += 1;
        }


        this.googleMapa.panTo(this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].googleMapDirection.routes[0].legs[0].start_location);
        this.tiempoRestanteDestino = this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].googleMapDirection.routes[0].legs[0].duration;
        this.distanciaRestanteDestino = this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones].googleMapDirection.routes[0].legs[0].distance;
        this.pintarDireccion(this.listaDePuntosSeleccionadosParaElViaje[this.indexActualdeListaDeDirecciones]);

    }


    aparecerYDesaparecer(poly) {
        let rutas = [...poly.getPath().i];
        poly.setPath([]);
        for (let i = 0; i < rutas.length; i++) {
            setTimeout(() => {
                poly.setPath([...poly.getPath().i, rutas[i]]);
            }, rutas.length < 22 ? i * 90 : i * 10);
        }
    }

    aparecerYDesaparecerCircle(circle) {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                circle.setOptions({
                    strokeOpacity: i * 0.1, fillOpacity: i * 0.1 > 0.3 ? 0.3 : i * 0.1
                });
            }, i * 300);
        }
    }


    crearMapa() {
        return new google.maps.Map(this.mapElement.nativeElement, {
            center: {lat: 0, lng: 0},
            zoom: 15,
            disableDefaultUI: true
        });
    }

    centrarMapa() {
        return new Promise((ok, nok) => {
            this.geolocation.getCurrentPosition().then(position => {

                let coordenadas = {lat: position.coords.latitude, lng: position.coords.longitude};
                console.log('moviendo camara');

                this.googleMapa.panTo(coordenadas);
                ok(coordenadas);
            }).catch(e => {
                nok(e);
            });
        });
    }

    crearMarker(coordenadas, tipo) {
        console.log(tipo);
        return new google.maps.Marker({
            position: coordenadas,
            icon: tipo == 'yo' ? 'assets/img/busMarker.png' : tipo == 'nino' ? 'assets/img/escolar.png' : tipo == 'school' ? 'assets/img/school.png' : '',
            map: this.googleMapa,
        });
    }

    crearPolyline(path, color, z, w) {
        return new google.maps.Polyline({
            path,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: w,
            zIndex: z,
            map: this.googleMapa
        });
    }


    crearDireccion(origen, destion) {
        return new Promise((ok, nok) => {
            this.directionService.route({
                origin: origen,
                destination: destion,
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


    crearRadio(pos) {
        return new google.maps.Circle({
            map: this.googleMapa,
            center: pos,
            radius: 38,
            strokeColor: '#FF0099',
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: '#009ee0',
            fillOpacity: 0.2
        });
    }

    geocoder = new google.maps.Geocoder;

    geocodeLatLng(pos) {

        let laPos = {
            lat: parseFloat(pos.split(',')[0]),
            lng: parseFloat(pos.split(',')[1])
        };

        return new Promise<String>((ok, nok) => {
            let latlng = laPos;
            console.log(pos);
            this.geocoder.geocode({location: laPos}, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        console.log(results[0].formatted_address);
                        ok(results[0].formatted_address);
                    } else {

                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        });

    }


    rellenarLista() {
        this.asistenciaService.obtenerAsistenciaPorDia(formatDate(new Date())).subscribe((okAsi: any) => {
            this.colegioService.obtenerColegios().subscribe((okColegios: any) => {
                this.listaDeNinos = okAsi.response;
                console.log(this.listaDeNinos);
                if (this.listaDeNinos.length == 0) {
                    alert('No existen niños para empezar un recorrido');
                    this.navCtrl.navigateRoot('/home');
                }

                let laListaDeN = [];
                for (let elN of this.listaDeNinos) {
                    let obj = {
                        ...elN,
                        //dirDecode:this.geocodeLatLng(elN.direccion)
                    };
                    laListaDeN.push(obj);
                }
                this.listaDeNinos = laListaDeN;
                this.listaDeColegios = okColegios.response;
                let listaDeC = [];
                for (let elN of this.listaDeColegios) {
                    let obj = {
                        ...elN,
                        //dirDecode:this.geocodeLatLng(elN.direccion)
                    };
                    listaDeC.push(obj);
                }
                this.listaDeColegios = listaDeC;


                console.log(this.listaDeNinos);
                if (this.mananaTarde) {
                    this.listaTotalDePuntos = [...this.listaDeNinos.filter(n => n.reglas == 3 || n.reglas == 1), ...this.listaDeColegios];
                } else {
                    this.listaTotalDePuntos = [...this.listaDeNinos.filter(n => n.reglas == 3 || n.reglas == 2), ...this.listaDeColegios];
                }

                //this.listaTotalDePuntos = [...this.listaDeNinos, ...okColegios.response];


                //this.calculateAndDisplay();

            });


        });
    }

    public onItemReorder({detail}) {


        this.listaTotalDePuntos = detail.complete(this.listaTotalDePuntos);
    }

    eliminar(este) {
        if (confirm('¿Estas seguro que deseas eliminar este punto?')) {
            console.log(este);
            this.listaTotalDePuntos = this.listaTotalDePuntos.filter(d => {
                if (d.rutN) {
                    return d.rutN != este.rutN;
                } else if (d.idColegio) {
                    return d.idColegio != este.idColegio;
                }
            });

            console.log(this.listaTotalDePuntos);

        }
    }

    ninosAsistiendoLista: any = [];

    prepararRuta() {

        this.socket.connect();
        console.log(this.transportista);
        let datosViaje = [];
        for (let puntoNino of this.listaTotalDePuntos.filter(p => p.idColegio == undefined)) {
            datosViaje.push({
                asistio: 2,
                nino: {
                    rutN: puntoNino.rutN
                }
            });
        }
        this.ninosAsistiendoLista = datosViaje;
        console.log(datosViaje);
        console.log(JSON.stringify(datosViaje));
        this.viajeService.iniciarViaje(datosViaje).subscribe((okViajeI: any) => {
            console.log(okViajeI);
            this.elIdViaje = okViajeI.response.idViaje;
        });


        this.socket.emit('inicioViaje', this.transportista);

        console.log('punto de inicio ' + this.posicionSeleccionada);
        let puntosLista = [];
        puntosLista = this.listaTotalDePuntos.map(o => {
            return {
                nombre: o.nombre,
                dirDecode: o.dirDecode,
                apellidoP: o.apellidoPaterno,
                rutN: o.rutN,
                lat: parseFloat(o.direccion.split(',')[0]),
                lng: parseFloat(o.direccion.split(',')[1]),
                esColegio: !!o.idColegio,
                colegio: !!o.idColegio ? o.idColegio : o.colegio.idColegio
            };
        });

        this.listaDePuntosSeleccionadosParaElViaje = [...puntosLista];


        console.log('puntos' + JSON.stringify(puntosLista));
        console.log('punto final' + JSON.stringify(this.listaTotalDePuntos[this.listaTotalDePuntos.length - 1]));

        this.vistaDePosiciones = false;
        this.vistaDeMapa = true;
        this.modoViaje = true;
        this.crearRuta().then(ok => {
            console.log(ok);
        });

    }

    async crearRuta() {


        let posActual = await this.centrarMapa();
        console.log(posActual);

        this.markerTransportista = this.crearMarker(posActual, 'yo');
        this.transportistaPoly = this.crearPolyline(posActual, '#00FF00', 10, 2);
        let recorridosTotalesConTransportista = [this.posicionSeleccionadaCoordenadas, ...this.listaDePuntosSeleccionadosParaElViaje];

        console.log(recorridosTotalesConTransportista);

        for (let i = 0; i < recorridosTotalesConTransportista.length; i++) {

            if (i == recorridosTotalesConTransportista.length - 1) {

            } else {
                console.log('calcular');
                console.log(recorridosTotalesConTransportista[i]);
                console.log(recorridosTotalesConTransportista[i + 1]);
                this.listaDePuntosSeleccionadosParaElViaje[i].googleMapDirection = await this.crearDireccion(recorridosTotalesConTransportista[i], recorridosTotalesConTransportista[i + 1]);
            }
        }
        console.log(this.listaDePuntosSeleccionadosParaElViaje);
        console.log(this.listaTotalDeDireccionesCreadas);
        this.pintarDireccion(this.listaDePuntosSeleccionadosParaElViaje[0]);


        this.geolocation.watchPosition().subscribe((ok: any) => {
            let data = {rut: this.transportista.rut, direccion: {lat: ok.coords.latitude, lng: ok.coords.longitude}};
            console.log(data);
            this.socket.emit('inicioViaje', data);

            this.googleMapa.panTo({lat: ok.coords.latitude, lng: ok.coords.longitude});
            this.markerTransportista.setPosition({lat: ok.coords.latitude, lng: ok.coords.longitude});
            this.transportistaPoly.setPath([...this.transportistaPoly.getPath().i, {lat: ok.coords.latitude, lng: ok.coords.longitude}]);

            if (this.pasoCircle.getBounds().contains({lat: ok.coords.latitude, lng: ok.coords.longitude})) {
                this.siguiente();
            }


        });


    }

    elIntervalo;
    elIntervalo2;

    elIdViaje;
    puntoActual;
    destinoDecode;

    pintarDireccion(direccion) {

        this.destino = `${direccion.nombre} ${direccion.apellidoP == undefined ? '' : direccion.apellidoP}`;
        this.destinoDecode = direccion.dirDecode;
        this.puntoActual = direccion;

        try {
            this.markerNinoProximo.setMap(null);
            this.rutaEnteraPoly.setMap(null);
            this.pasoPoly.setMap(null);
            this.pasoCircle.setMap(null);
            clearInterval(this.elIntervalo);
            clearInterval(this.elIntervalo2);
        } catch (e) {

        }
        console.log(direccion.googleMapDirection);
        this.markerNinoProximo = this.crearMarker(direccion, direccion.esColegio ? 'school' : 'nino');
        let direccionService = direccion.googleMapDirection.routes[0];
        this.tiempoRestanteDestino = direccion.googleMapDirection.routes[0].legs[0].duration;
        this.distanciaRestanteDestino = direccion.googleMapDirection.routes[0].legs[0].distance;
        console.log(direccionService);
        this.rutaEnteraPoly = this.crearPolyline(direccionService.overview_path, '#FF0000', 1, 8);
        let indicaciones = direccionService.legs[0];
        console.log('la indica');
        console.log(indicaciones);
        console.log('la direcc');
        console.log(direccion);

        this.listaActualDePasos = indicaciones.steps;
        this.pasoPoly = this.crearPolyline(indicaciones.steps[0].path, '#27beff', 5, 4);
        this.pasoCircle = this.crearRadio(indicaciones.steps[0].end_location);
        this.instruccionActual = indicaciones.steps[0].instructions;
        //console.log(this.pasoCircle.getBounds().contains(posActual));


        this.elIntervalo = setInterval(() => {
            this.aparecerYDesaparecer(this.pasoPoly);
        }, 2000);
        this.elIntervalo2 = setInterval(() => {
            this.aparecerYDesaparecerCircle(this.pasoCircle);
        }, 3000);

        /* direccion.routes.forEach((r: any) => {
               console.log(r.overview_path);
               console.log(r);
               rutaEnteraPoly = this.crearPolyline(r.overview_path, '#FF0000');
               r.legs.forEach((leg: any) => {



               });
           }
       );*/
    }


    confirmarPosicionActual() {
        if (this.posicionSeleccionada === 'casaT') {
            this.posicionSeleccionadaCoordenadas = this.transportista.direccion;
        } else {
            this.posicionSeleccionadaCoordenadas = this.posicionActualCoordenadas;
        }
        this.vistaDePosicionActual = false;
        this.vistaDePosiciones = true;
        console.log(this.posicionSeleccionadaCoordenadas);
    }


    mananaOTarde() {
        if (this.mananaTarde) {
            this.listaTotalDePuntos = [...this.listaDeNinos.filter(n => n.reglas == 3 || n.reglas == 1), ...this.listaDeColegios];
        } else {
            this.listaTotalDePuntos = [...this.listaDeNinos.filter(n => n.reglas == 3 || n.reglas == 2), ...this.listaDeColegios];
        }


    }

    pint() {
        this.googleMapa = this.crearMapa();
        console.log(this.googleMapa);
    }


    async ionViewWillEnter() {
        this.rellenarLista();

        await this.platform.ready();


            if(await this.locationAccuracy.canRequest()) {
                // the accuracy option will be ignored by iOS
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                    () => console.log('Request successful'),
                    error => console.log('Error requesting location permissions', error)
                );
            }

        this.cargarTransportista();


        let coord = await this.geolocation.getCurrentPosition();






        this.posicionActualCoordenadas.lat = coord.coords.latitude;
        this.posicionActualCoordenadas.lng = coord.coords.longitude;
    }

    ionViewDidEnter() {
        this.pint();
        console.log('ya entro');
    }


}


function formatDate(date) {
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
