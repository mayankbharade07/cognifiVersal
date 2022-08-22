// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://65.0.133.164",
  reportURL: "http://65.0.133.164",
  dashboardBaseURL: "http://13.235.135.219/grafana/",
  currentInfoURL: "d/IyC3wYknk/current-day-info",
  homeDashboardURL: "d/L0N-9ZeMk/home-dashboard",
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://13.233.229.160:8080/auth',

    // Realm3
    realm: 'itac20',

    // The SPA's id. 
    // The SPA is registerd with this id at the auth-serverß
    //clientId: 'itac_app_dev',

    //credentials: {secret: '8a693ac8-f8b9-4e8d-8b98-7aa7461db205'},
    clientId: 'itac_app',

    credentials: {secret: 'b43f4799-51a3-47f2-9207-96a51d766e93'},
    //clientId: 'itac_app_qa',

    //credentials: {secret: '685bd6bb-d1b2-46a1-b833-637a1f1a6bae'},
  },
  firebase: {
    apiKey: "AIzaSyDR5G1uNjOhv7EDfCy5vhez5vBQ-2EOElU",
    authDomain: "schoolitacnotifier.firebaseapp.com",
    databaseURL: "https://schoolitacnotifier.firebaseio.com",
    projectId: "schoolitacnotifier",
    storageBucket: "schoolitacnotifier.appspot.com",
    messagingSenderId: "728470800782",
    appId: "1:728470800782:web:f90e4cec1937c1ac38bcdf"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
