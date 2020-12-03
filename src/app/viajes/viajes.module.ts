import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ViajesPageRoutingModule} from './viajes-routing.module';

import {ViajesPage} from './viajes.page';
import {PapaParseModule} from 'ngx-papaparse';
import {File} from '@ionic-native/file/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        PapaParseModule,
        HttpClientModule,
        FormsModule,
        IonicModule,
        ViajesPageRoutingModule
    ],
    declarations: [ViajesPage],
    providers: [
        File,
        SocialSharing
    ]
})
export class ViajesPageModule {
}
