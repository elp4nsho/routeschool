import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  vistaRegistrar = false;
  email: string = "fcisternasu@gmail.com";
  name: string;
  password: string= "12345678";

  constructor(
      private authService: AuthService,
      private menuCtrl: MenuController,
      public router: Router
  ) { }

  ngOnInit() {

  }

  doLogin()
  {
    this.authService.login(this.email, this.password).then( () =>{
      this.logear()
    }).catch(err => {
      alert('los datos son incorrectos o no existe el usuario');
      console.log(err);
    })
  }


  loginGoogle(){
   this.authService.loginWithGoogle().then(()=>{
     this.logear()

   }).catch(err => {
     alert('los datos son incorrectos o no existe el usuario contacta a soporte');
     console.log(err);

   })
  }

  loginFacebook(){
    this.authService.loginWithFacebook().then(()=>{
      this.logear()
    }).catch(err => {
      alert('los datos son incorrectos o no existe el usuario contacta a soporte');
      alert(err);
      alert(JSON.stringify(err));

    })
  }

  irARegistrar(){
  this.vistaRegistrar = !this.vistaRegistrar
  }
  registrarse(){
    this.authService.register(this.email,this.password,this.name).then((ok)=>{
      console.log(ok)
      alert(ok)

      this.router.navigate(['/login']);
    }).catch((err:any) => {
      if(err.code == "auth/weak-password"){
        alert("La clave debe tener almenos 6 caracteres")
      }
      else if(err.code == "auth/email-already-in-use"){
        alert("El correo ya esta en uso")

      }else{
        alert(err);

      }

    })
  }

  olvideContra(){
    this.authService.recoveryPassword(prompt('ingrese su correo')).then(ok=>{

    })
  }


  logear(){
    this.authService.guardarCookie().then(token=>{
      localStorage.setItem("access_token",token)
      this.router.navigate(['/home']);

    })
  }

  ionViewWillEnter(){
  this.menuCtrl.enable(false);

  }

}
