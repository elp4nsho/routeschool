import {Component, OnInit} from '@angular/core';
import {ApoderadoService} from '../services/apoderado.service';
import {NavigationExtras, Router} from '@angular/router';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {environment} from '../../environments/environment';
import {ColegiosService} from '../services/colegios.service';

@Component({
    selector: 'app-apoderados',
    templateUrl: './apoderados.page.html',
    styleUrls: ['./apoderados.page.scss'],
})
export class ApoderadosPage implements OnInit {
    mostrarModalAgregar = false;
    mostrarModalLinkRegistro = false;
    listaApoderados = [];
    linkRegistro = '';

    constructor(
        private router: Router,
        private socialSharing: SocialSharing,
        private colegioService: ColegiosService,
        private apoderadoService: ApoderadoService
    ) {
    }

    ngOnInit() {
    }

    irA(obj) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                special: JSON.stringify(obj)
            }
        };
        this.router.navigate(['apoderado'], navigationExtras);
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

    modalAgregar() {
        console.log('modalo');
        this.mostrarModalAgregar = true;
    }

    generarLink() {
        console.log('generar link');
        this.mostrarModalAgregar = false;
        this.colegioService.crearLinkRegistro().subscribe((link: any) => {

            this.linkRegistro = environment.host + '/apoderado/formulario/' + link.response.link;

        });
        this.mostrarModalLinkRegistro = true;
    }

    share(link) {
        this.socialSharing.share(link).then(ok => {
            console.log(ok);
        });
    }

    ionViewWillEnter() {
        // this.mostrarModalAgregar = false;

        //this.socialSharing.

        this.apoderadoService.obtenerApoderados().subscribe((d: any) => {
            //alert(d)
            console.log(d.response);
            this.listaApoderados = d.response;
        });


    }
}
