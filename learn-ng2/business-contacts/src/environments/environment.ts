// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCk2mCJXBzwgKtmi8Eyj8UOmpi41WY2k7o',
    authDomain: 'busniness-contacts.firebaseapp.com',
    databaseURL: 'https://busniness-contacts.firebaseio.com',
    projectId: 'busniness-contacts',
    storageBucket: 'busniness-contacts.appspot.com',
    messagingSenderId: '137498536884'
  }
};
