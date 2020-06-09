import firebase from 'firebase' ;

var config = {
    apiKey: "AIzaSyB0YFC3jJKgyLiMakLuMYIUyG4m2Ab4vKQ",
    authDomain: "react-1d3cf.firebaseapp.com",
    databaseURL: "https://react-1d3cf.firebaseio.com",
    projectId: "react-1d3cf",
    storageBucket: "react-1d3cf.appspot.com",
    messagingSenderId: "933978016610",
    appId: "1:933978016610:web:eab7fda7f913ed5b55fa3b",
    measurementId: "G-DHDR6NST1Y"
  };

  
  const fire = firebase.initializeApp(config);
  export default fire;
