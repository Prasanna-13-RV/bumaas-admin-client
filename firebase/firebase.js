// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAJtY_bxC_BXVHOVNmeOeFlCr6bZ-4VV4w',
	authDomain: 'auth-app-b6be3.firebaseapp.com',
	projectId: 'auth-app-b6be3',
	storageBucket: 'auth-app-b6be3.appspot.com',
	messagingSenderId: '1027780445867',
	appId: '1:1027780445867:web:67e69043688aca11a099ee'
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const auth = firebase.auth();

export { auth };
