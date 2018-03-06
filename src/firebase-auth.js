// Initialize Firebase

var config = {
	apiKey: 'AIzaSyDimm2lbiquyE2GQeEma7Oxqv6SOr5fq8k',
	authDomain: 'ian-schu-conway-game-of-life.firebaseapp.com',
	databaseURL: 'https://ian-schu-conway-game-of-life.firebaseio.com',
	projectId: 'ian-schu-conway-game-of-life',
	storageBucket: '',
	messagingSenderId: '139888044667'
};
firebase.initializeApp(config);

// ui.start('#firebaseui-auth-container', {
// 	signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
// 	// Other config options...
// });

var authContainer = document.getElementById('auth-container');
var signInString = document.getElementById('signIn-string');
var signOutString = document.getElementById('signOut-string');
var userString = document.getElementById('user-string');

var urlParams = new URLSearchParams(window.location.search);

var ui = new firebaseui.auth.AuthUI(firebase.auth());

firebase
	.auth()
	.setPersistence(firebase.auth.Auth.Persistence.SESSION)
	.then(function() {
		// Existing and future Auth states are now persisted in the current
		// session only. Closing the window would clear any existing state even
		// if a user forgets to sign out.
		// ...
		// New sign-in will be persisted with session persistence.
		return firebase.auth().signInWithEmailAndPassword(email, password);
	})
	.catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
	});

var uiConfig = {
	callbacks: {
		signInSuccess: function(currentUser, credential, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			return true;
		},
		uiShown: function() {
			// The widget is rendered.
			// Hide the loader.
			document.getElementById('loader').style.display = 'none';
		}
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	credentialHelper: firebaseui.auth.CredentialHelper.NONE,
	signInSuccessUrl: '/?signedIn=true',
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: '<your-tos-url>'
};

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		isSignedIn();
	} else {
		signInString.style.display = 'inline';
		signOutString.style.display = 'none';
	}
});

function isSignedIn() {
	signInString.style.display = 'none';
	signOutString.style.display = 'inline';
	userString.textContent = `Signed in as ${firebase.auth().currentUser.displayName}`;
	userString.style.display = 'inline';
}

// if (urlParams.get('signedIn') == 'true') {
// } else {
//
// }

signInString.addEventListener('click', () => {
	authContainer.style.display = 'block';
	ui.start('#firebaseui-auth-container', uiConfig);
});

signOutString.addEventListener('click', () => {
	firebase
		.auth()
		.signOut()
		.then(function() {
			window.location.replace('http://ian-schu-game-of-life-3.surge.sh/');
		})
		.catch(function(error) {
			console.log(error);
		});
});
