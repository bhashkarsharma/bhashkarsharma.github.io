import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyD0Ofbb4-RWG1S1fbnOcDh0uaf_MbUNLxk',
    authDomain: 'blistering-heat-9565.firebaseapp.com',
    databaseURL: 'https://blistering-heat-9565.firebaseio.com',
    projectId: 'blistering-heat-9565',
    storageBucket: 'blistering-heat-9565.appspot.com',
    messagingSenderId: '10386804778'
};
const Fire = firebase.initializeApp(config);
export default Fire;