const  firebase  = require('firebase');
const Config = require('./Config');

require('firebase/auth');
require('firebase/database');
require('firebase/storage');

const mainApp = firebase.initializeApp(Config.firebaseCredentials);
const storage = firebase.storage();

const getRef = (ref) => {
	return ref.once("value")
		.then(snapshot => {

			return snapshot.val();

		});
}

const listen = (ref, callback) => {
    return ref.on("value", snapshot => {
        const val = snapshot ? snapshot.val() : {};
        callback.call(this, val, ref);
    })
}

const listen_added = (ref, callback) => {
    return ref.on("child_added", snapshot => {
        callback.call(this, snapshot.val());
    })
}

module.exports = {
	mainApp,
	storage,
	getRef,
};
