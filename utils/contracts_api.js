// import { mainApp, getRef, listen } from '../constants/firebase_debug';
const {mainApp, getRef, listen}  = require('../constants/firebase');

let contractsRef,
    contractRef;

const configureFirebase = () => {
    contractsRef = mainApp.database().ref("contracts");
}

const configureContract = (id) => {
    contractRef = contractsRef.child(id);
}

const fetchContract = () => {

    return getRef(contractRef);
}


configureFirebase();

module.exports = {
    configureFirebase,
    configureContract,
    fetchContract,
}