import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

declare var google;

@Component({
    selector: 'app-terminar-registro',
    templateUrl: './terminar-registro.page.html',
    styleUrls: ['./terminar-registro.page.scss'],
})
export class TerminarRegistroPage implements OnInit {
    @ViewChild('mapElement', {static: false}) mapElement;

    user: any = {};

    userForm: any = {};

    elMap;
    elMarker;
    geocoder = new google.maps.Geocoder;
    regExNombre = /^[A-z]+$/;
    regExRut = /^[0-9]{8,9}[-|‐]{1}[0-9kK]{1}$/;

    constructor(private loginService: LoginService, private router: Router) {
    }

    ngOnInit() {
        this.userForm.nombre = true;
        this.userForm.rut = true;
        this.userForm.direccion = true;
        this.user.nombre = '';
        this.user.rut = '';
        this.user.direccion = '';
    }

    registrar() {

        this.userForm.nombre = this.regExNombre.test(this.user.nombre);

        this.userForm.rut = this.regExRut.test(this.user.rut);

        var Fn = {
            // Valida el rut con su cadena completa "XXXXXXXX-X"
            validaRut: function(rutCompleto) {
                if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) {
                    return false;
                }
                var tmp = rutCompleto.split('-');
                var digv = tmp[1];
                var rut = tmp[0];
                if (digv == 'K') {
                    digv = 'k';
                }
                return (Fn.dv(rut) == digv);
            },
            dv: function(T) {
                var M = 0, S = 1;
                for (; T; T = Math.floor(T / 10)) {
                    S = (S + T % 10 * (9 - M++ % 6)) % 11;
                }
                return S ? S - 1 : 'k';
            }
        };

        this.userForm.rut = Fn.validaRut(this.user.rut);


        this.userForm.direccion = !(this.user.direccion == '');
        if (this.user.direccion != '' && this.userForm.nombre && this.userForm.rut) {
            this.geocodeAddressV().then(direccionOk => {
                this.userForm.direccion = direccionOk;

                if (this.userForm.direccion) {
                    if (confirm('¿Desea confirmar su registro?')) {
                        let data = {
                            direccion: this.user.dirV,
                            nombre: this.user.nombre,
                            rut: this.user.rut
                        };
                         this.loginService.terminarRegistro(data).subscribe((ok: any) => {
                             if (ok.message === 'Creado') {
                                 this.router.navigateByUrl('/home');
                             }
                         });
                    }


                } else {

                }

            });

        }

    }


    geocodeAddressV() {
        return new Promise((ok, nok) => {
            this.geocoder.geocode({address: this.user.direccion}, (results, status) => {
                if (status === 'OK') {
                    this.user.dirV = results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
                    this.elMap.panTo(results[0].geometry.location);
                    this.elMap.setZoom(16);
                    this.elMarker.setPosition(results[0].geometry.location);
                    console.log(results[0].geometry.location);
                    ok(true);
                } else {
                    console.log(status);
                    ok(false);
                }
            });
        });
    }

    geocodeAddress() {
        this.geocoder.geocode({address: this.user.direccion}, (results, status) => {
            if (status === 'OK') {
                this.user.dirV = results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();
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
                    this.user.direccion = results[0].formatted_address;
                } else {

                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    async ionViewWillEnter() {
        this.user.dirV = '-33.443219,-70.649570';
        this.elMap = new google.maps.Map(this.mapElement.nativeElement, {
            center: {lat: -33.443219, lng: -70.649570},
            zoom: 10
        });
        this.elMarker = new google.maps.Marker({
            position: {lat: -33.443219, lng: -70.649570},
            map: this.elMap,
        });

        this.elMap.addListener('click', (mapsMouseEvent) => {
            // Close the current InfoWindow.
            let position = mapsMouseEvent.latLng;
            this.geocodeLatLngNino(position);
            this.user.dirV = position.lat() + ',' + position.lng();
            this.elMarker.setPosition(position);
        });

    }

}
