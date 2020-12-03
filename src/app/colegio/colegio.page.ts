import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApoderadoService} from '../services/apoderado.service';
import {ColegiosService} from '../services/colegios.service';
import {MenuController} from '@ionic/angular';

declare var google;

@Component({
    selector: 'app-colegio',
    templateUrl: './colegio.page.html',
    styleUrls: ['./colegio.page.scss'],
})
export class ColegioPage implements OnInit {
    @ViewChild('mapElement', {static: false}) mapElement;

    data: any;
    nombre = '';
    direccion = '';
    listaNinos = [];
    elMap;
    elMarker;
    colegio: any = {};
    geocoder = new google.maps.Geocoder;

    constructor(
        public activatedRoute: ActivatedRoute,
        private colegiosService: ColegiosService,
        private router: Router, private apoderadoService: ApoderadoService
    ) {

    }

    ngOnInit() {


    }

    eliminar() {
        console.log(this.colegio);
        if(this.listaNinos.length>0){
            alert("no es posible eliminar colegios con niños elimine los apoderados")
        }else{
            this.colegiosService.eliminarColegio(this.colegio.idColegio).subscribe(okEliminar => {
                console.log(okEliminar);
                this.router.navigateByUrl('/colegios');
            });
        }

    }

    editar() {
        let data = {
            nombre: this.colegio.nombre,
            idColegio: this.colegio.idColegio,
            direccion: this.colegio.dirCoords.lat + ',' + this.colegio.dirCoords.lng
        };
        this.colegiosService.editarColegio(data).subscribe(okEditar => {
            console.log(okEditar);
            this.router.navigateByUrl('/colegios');

        });
    }

    atras(path) {
        this.router.navigateByUrl('/' + path);
    }

    geocodeAddress() {
        this.geocoder.geocode({address: this.colegio.direccion}, (results, status) => {
            if (status === 'OK') {
                this.colegio.dirCoords = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
                this.elMap.panTo(results[0].geometry.location);
                this.elMap.setZoom(16);
                this.elMarker.setPosition(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    buscarDir() {
        this.geocodeAddress();
    }

    geocodeLatLngNino(pos) {
        const latlng = pos;
        this.geocoder.geocode({location: latlng}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    this.colegio.direccion = results[0].formatted_address;
                } else {

                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }


    ionViewWillEnter() {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params && params.special) {
                this.colegio = JSON.parse(params.special);
                console.log(JSON.parse(params.special));
                this.colegiosService.obtenerNinosPorColegio(this.colegio.idColegio).subscribe((ninos: any) => {
                    console.log(ninos);
                    this.listaNinos = ninos.response;
                });

                this.colegio.dirCoords = {
                    lat: parseFloat(this.colegio.direccion.split(',')[0]),
                    lng: parseFloat(this.colegio.direccion.split(',')[1])
                };

                this.elMap = new google.maps.Map(this.mapElement.nativeElement, {
                    center: this.colegio.dirCoords,
                    zoom: 16,
                    disableDefaultUI: true
                });
                this.elMarker = new google.maps.Marker({
                    position: this.colegio.dirCoords,
                    map: this.elMap,
                });
                this.elMap.addListener('click', (mapsMouseEvent) => {
                    // Close the current InfoWindow.
                    let position = mapsMouseEvent.latLng;
                    this.colegio.dirCoords = {lat: position.lat(), lng: position.lng()};
                    this.geocodeLatLngNino(position);
                    this.elMarker.setPosition(position);
                });
                this.geocodeLatLngNino(this.colegio.dirCoords)


            }
        }).unsubscribe();


    }
}
