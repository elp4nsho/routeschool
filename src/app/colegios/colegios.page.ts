import {Component, NgZone, OnInit} from '@angular/core';
import {ColegiosService} from '../services/colegios.service';
import {ActivatedRoute, NavigationExtras, Route, Router} from '@angular/router';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-colegios',
    templateUrl: './colegios.page.html',
    styleUrls: ['./colegios.page.scss'],
})
export class ColegiosPage implements OnInit {

    listaColegios = [];
    mostrarModalAgregar = false;
    mostrarModalLinkRegistro = false;
    constructor(
        //private socialSharing: SocialSharing,
        private router: Router,
        private colegioService: ColegiosService,
        private  ngZone:NgZone
    ) {
        this.mostrarModalAgregar = false;

    }

    cerrarModal(event) {
        if (event.target.className === 'modalAgregar') {

            this.mostrarModalAgregar = false;
        }
    }
    cerrarModalLink(event) {
        if (event.target.className === 'modalAgregar') {

            this.mostrarModalLinkRegistro = false;
        }
    }

    agregarColegio() {
        console.log('agregar colegio');
        this.router.navigateByUrl("/add-colegio")

    }


    /*share(link){
        this.socialSharing.share(link).then(ok=>{
            console.log(ok)
        })
    }*/


    modalAgregar() {
        console.log("modalo")
        this.mostrarModalAgregar = true;
    }

    irAColegio(colegio){
        let navigationExtras: NavigationExtras = {
            queryParams: {
                special: JSON.stringify(colegio)
            }
        };
        this.router.navigate(['colegio'], navigationExtras);
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.mostrarModalAgregar = false;

        //this.socialSharing.

        this.colegioService.obtenerColegios().subscribe((d: any) => {
            //alert(d)
            console.log(d.response)
            this.listaColegios = d.response;
        });

    }

}
