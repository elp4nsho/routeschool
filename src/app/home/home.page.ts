import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(
        private router:Router,
        private loginService:LoginService,
        private menuCtrl:MenuController,
        private authService: AuthService
    ) {


    }

    ngOnInit() {
      this.authService.userDetails().subscribe(d=>{
        console.log(d)
      })

    }

    peticion() {
        this.authService.guardarCookie();
    }

    ionViewWillEnter() {

        this.loginService.verificarRegistro().subscribe((ok:any)=>{
            if(ok.message ==="Registro Incompleto"){
                this.router.navigateByUrl("/terminar-registro")
            }else if(ok.message ==="OK"){
                this.menuCtrl.enable(true);
            }
        },error => {
            this.router.navigateByUrl("/")
        })
    }

    verificarRegistro(){

    }

}
