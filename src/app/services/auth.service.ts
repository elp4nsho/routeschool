import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {auth} from 'firebase';

import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private googlePlus: GooglePlus, private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore, private fb: Facebook) {
    }

    login(email: string, password: string) {

        return new Promise((resolve, rejected) => {
            this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
                console.log(user);

                resolve(user);
            }).catch(err => rejected(err));
        });


    }

    guardarCookie(){
        return this.AFauth.auth.currentUser.getIdToken(true)
    }


    logout() {
        this.AFauth.auth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }

    register(email: string, password: string, name: string) {

        return new Promise((resolve, reject) => {
            this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
                // console.log(res.user.uid);
                const uid = res.user.uid;
                this.db.collection('users').doc(uid).set({
                    name: name,
                    uid: uid
                });

                resolve(res);
            }).catch(err => reject(err));
        });


    }


    loginWithGoogle() {
        return this.googlePlus.login({}).then(res => {
            const userDataGoogle = res;
            return this.AFauth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userDataGoogle.accessToken));
        });
    }

    loginWithFacebook() {
        return this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
            const credentialsFb = auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
            return this.AFauth.auth.signInWithCredential(credentialsFb);
        });
    }

    registerUser(value) {
        return new Promise<any>((resolve, reject) => {

            this.AFauth.auth.createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err));
        });

    }

    recoveryPassword(userEmail){
        return this.AFauth.auth.sendPasswordResetEmail(userEmail)
    }

    userDetails() {
        return this.AFauth.user;
    }



}
