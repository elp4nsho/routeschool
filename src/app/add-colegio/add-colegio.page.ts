import {Component, OnInit, ViewChild} from '@angular/core';
import {ColegiosService} from '../services/colegios.service';
import {Router} from '@angular/router';

declare var google;

@Component({
    selector: 'app-add-colegio',
    templateUrl: './add-colegio.page.html',
    styleUrls: ['./add-colegio.page.scss'],
})
export class AddColegioPage implements OnInit {
    @ViewChild('mapElement', {static: false}) mapElement;

    colegio: any = {};
    elMap;
    elMarker;
    geocoder = new google.maps.Geocoder;
    colegioForm: any = {};

    constructor(
        private colegioService: ColegiosService,
        private nav: Router
    ) {
    }

    ngOnInit() {
        this.colegio.nombre = '';
        this.colegio.direccion = '';
        this.colegioForm.nombre = true;
        this.colegioForm.direccion = true;
    }

    crear() {

        if (this.colegio.nombre == '') {
            this.colegioForm.nombre = false;
        } else if (this.colegio.direccion == '') {
            this.colegioForm.nombre = true;

            this.colegioForm.direccion = false;

        } else {
            this.colegioForm.direccion = true;
            this.geocodeAddressV().then(okDir => {
                if (okDir) {
                    this.colegioForm.nombre = true;
                    this.colegioForm.direccion = true;
                    console.log(this.colegio);
                    if (confirm('¿Desea confirmar el colegio ingresado?')) {
                        let data = {
                            nombre: this.colegio.nombre,
                            direccion: this.colegio.dirV
                        };
                        this.colegioService.crearColegio(data).subscribe(d => {
                            console.log(d);
                            this.nav.navigateByUrl('/colegios');
                        });
                    }
                } else {
                    this.colegioForm.direccion = false;

                }
            });

        }


    }


    geocodeAddressV() {
        return new Promise((ok, nok) => {

            this.geocoder.geocode({address: this.colegio.direccion}, (results, status) => {
                if (status === 'OK') {
                    this.colegio.dirV = results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
                    this.elMap.panTo(results[0].geometry.location);
                    this.elMap.setZoom(16);
                    this.elMarker.setPosition(results[0].geometry.location);
                    ok(true);
                } else {
                    ok(false);
                }
            });
        });


    }

    geocodeAddress() {
        this.geocoder.geocode({address: this.colegio.direccion}, (results, status) => {
            if (status === 'OK') {
                this.colegio.dirV = results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
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

    salir() {
        this.nav.navigateByUrl('colegios');
    }

    async ionViewWillEnter() {
        this.colegio.dirV = '-33.443219,-70.649570';
        this.elMap = new google.maps.Map(this.mapElement.nativeElement, {
            center: {lat: -33.443219, lng: -70.649570},
            zoom: 10,
            disableDefaultUI: true
        });
        this.elMarker = new google.maps.Marker({
            position: {lat: -33.443219, lng: -70.649570},
            map: this.elMap,
        });

        this.elMap.addListener('click', (mapsMouseEvent) => {
            // Close the current InfoWindow.
            let position = mapsMouseEvent.latLng;
            this.geocodeLatLngNino(position);
            this.colegio.dirV = position.lat() + ',' + position.lng();
            this.elMarker.setPosition(position);
        });

    }


}
