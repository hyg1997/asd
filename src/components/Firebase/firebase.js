import app from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyApkwMVkwLUPcjkGdbTNPg53HRVc2wiXR0',
    authDomain: 'crud-ac0ad.firebaseapp.com',
    databaseURL: 'https://crud-ac0ad.firebaseio.com',
    projectId: 'crud-ac0ad',
    storageBucket: 'crud-ac0ad.appspot.com',
    messagingSenderId: '852922211878',
    appId: '1:852922211878:web:12ef1ba3569f70ac'
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.db = app.firestore();
    }

    /* Firebase APIs */

    // *** Clients API ***
    client = cid => this.db.doc(`clients/${cid}`);

    clients = () => this.db.collection('clients');
}

export default Firebase;