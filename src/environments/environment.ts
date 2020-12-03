// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host:"http://approuteschool.ddns.net:8080"
  //host:"http://localhost:8080"
};

export const firebaseConfig = {
  apiKey: "AIzaSyBi569eRkTwCBG656uiRs03qriAskdrx3A",
  authDomain: "routeschoollogin.firebaseapp.com",
  databaseURL: "https://routeschoollogin.firebaseio.com",
  projectId: "routeschoollogin",
  storageBucket: "routeschoollogin.appspot.com",
  messagingSenderId: "518079670745",
  appId: "1:518079670745:web:3f862006b3ea99cbf311c8"
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
