import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApoderadoService} from '../services/apoderado.service';

declare var google;

@Component({
    selector: 'app-apoderado',
    templateUrl: './apoderado.page.html',
    styleUrls: ['./apoderado.page.scss'],
})
export class ApoderadoPage implements OnInit {
    apoderado: any = {};
    ninoElegido: any = undefined;
    geocoder = new google.maps.Geocoder;

    constructor(
        public activatedRoute: ActivatedRoute,
        public apoderadoService: ApoderadoService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    seleccionarNino(n) {
        console.log('cambiando niño');
        console.log(n);
        console.log(this.ninoElegido);
        this.ninoElegido.dirCoords = {
            lat: parseFloat(this.ninoElegido.direccion.split(',')[0]),
            lng: parseFloat(this.ninoElegido.direccion.split(',')[1])
        };
        this.geocodeLatLngNinoO(this.ninoElegido.dirCoords);

    }

    eliminar() {
        this.apoderadoService.eliminar(this.apoderado).subscribe(okEliminar => {
            console.log(okEliminar);
            this.router.navigateByUrl('/apoderados');
        });
    }

    atras(path) {
        this.router.navigateByUrl('/' + path);
    }

    geocodeLatLngNino(pos) {
        const latlng = pos;
        this.geocoder.geocode({location: latlng}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    this.apoderado.direccion = results[0].formatted_address;
                } else {

                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    geocodeLatLngNinoO(pos) {
        const latlng = pos;
        this.geocoder.geocode({location: latlng}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    this.ninoElegido.direccion = results[0].formatted_address;
                } else {

                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    ionViewWillEnter() {

        this.activatedRoute.queryParams.subscribe((params: any) => {
            if (params && params.special) {
                console.log(JSON.parse(params.special));
                this.apoderado = JSON.parse(params.special);
                this.apoderado.dirCoords = {
                    lat: parseFloat(this.apoderado.direccion.split(',')[0]),
                    lng: parseFloat(this.apoderado.direccion.split(',')[1])
                };
                this.geocodeLatLngNino(this.apoderado.dirCoords);


            }
        }).unsubscribe();

    }


}
