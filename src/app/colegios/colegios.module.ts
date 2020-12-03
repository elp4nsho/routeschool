import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ColegiosPageRoutingModule} from './colegios-routing.module';
import {LaModalComponent} from '../la-modal/la-modal.component';
import {ColegiosPage} from './colegios.page';
import {ColegiosService} from '../services/colegios.service';
//import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {LoginService} from '../services/login.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,

        ColegiosPageRoutingModule
    ],
    providers: [
        ColegiosService,
        LaModalComponent,
      //  SocialSharing,
        LoginService
    ],
    declarations: [ColegiosPage]
})
export class ColegiosPageModule {
}
