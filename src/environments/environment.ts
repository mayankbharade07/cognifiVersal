// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {

    // API_URL : 'http://192.168.1.50:8076', //devtsging income/expense
    // API_URL_BATA: 'http://192.168.1.50:8071', //devstaging bata/ trip/etc
    // API_URL : 'https://cogniphiapibackend.moreyeahs.in',
    // API_URL_BATA: 'https://batacongniphiapibackned.moreyeahs.in',
    API_URL : 'http://cogniphienhancebackend.moreyeahs.in', // new uat for Income/Expense
    API_URL_BATA: 'http://batacogniphienhancebackend.moreyeahs.in', //new uat for Bata/Trip/Customer/Currency/Base Location
    API_URL_ITAC: 'http://13.233.175.113:',
    // API_URL : 'http://d0d3-103-15-67-130.ngrok.io',
    // API_URL_BATA : 'http://a8df-103-15-67-130.ngrok.io',
   
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
