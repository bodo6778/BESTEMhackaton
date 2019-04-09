firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  
  
  function register(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    const isValidEmail = email_field.checkValidity();
    var popup = document.getElementById("myPopup");
  
    if (userPass.length < 6){
  
      console.log("parola mica");
      
    
    } else
    if ( !isValidEmail ){
      console.log("email prost");
      
      popup.classList.toggle("show");
      
    } else {
      
  
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
      writeUserData();
    }
  }
   
function isLogged(){
  var user = firebase.auth().currentUser;
  var em = user.email;
  if (user) {
    // User is signed in.
    console.log("logat" + em);
  } else {
    // No user is signed in.
    console.log("delogat");
  }
}

  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    document.cookie = "email= " + userEmail;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
   
      window.alert("Error : " + errorMessage);
   
      // ...
    });
    getdata(userEmail);
  }
   
  function logout(){
    firebase.auth().signOut();
  }
  
  
  function getdata(name){
    var database = firebase.firestore();
    //var name = document.getElementById("email_field").value;
    var dbMail = database.collection('users').doc(name);
    var dbVenituri = dbMail.collection("dateEconomice").doc("venituri");
    var dbCheltuieli = dbMail.collection("dateEconomice").doc("cheltuieli");
    var dbEconomii = dbMail.collection("dateEconomice").doc("economii");
    dbVenituri.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });


  }
  
  
  function writeUserData() {
    var database = firebase.firestore();
    var name = document.getElementById("email_field").value;
    var passwd = document.getElementById("password_field").value;
    //var userId = firebase.auth().currentUser.uid;
  //  firebase.auth().onAuthStateChanged(function(user) {
  //    var user = firebase.auth().currentUser;
  //
  //  if (user != null) {
  //   user.providerData.forEach(function (profile) {
  //     console.log("Sign-in provider: " + profile.providerId);
  //     console.log("  Provider-specific UID: " + profile.uid);
  //   });
  //  }else{
  //    console.log("delog");
  //  }
  //});
      var postDataVenituri = {
      salariu: 0,
      parinti: 0,
      bursa: 0
    }
    
    var postDataCheltuieli = {
      distractie: 0,
      studii: 0,
      tehnologie: 0,
      fashion: 0,
      altele: 0,
      eveniment: 0
    }
    
    var postDataEconomii = {
      cuScop: 0,
      eveniment: 0,
      altele: 0
    }
  
    var dbMail = database.collection('users').doc(name);
    var dbVenituri = dbMail.collection("dateEconomice").doc("venituri");
    dbVenituri.set(postDataVenituri);
    var dbCheltuieli = dbMail.collection("dateEconomice").doc("cheltuieli");
    dbCheltuieli.set(postDataCheltuieli);
    var dbEconomii = dbMail.collection("dateEconomice").doc("economii");
    dbEconomii.set(postDataEconomii);

    /*
    var newPostKey = firebase.database().ref().child('users').push().key;
    var updates = {};
    updates['/users/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);*/
   // firebase.database().ref('users/' + "aFPMEboNzluL7G0XWVlB").set();
  }

  // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Venituri
function openModalVenituri(){
  document.getElementById('myVenituri').style.display = 'block';
}
function closeModalVenituri(){
  document.getElementById('myVenituri').style.display = 'none';
}
// Cheltuieli
function openModalCheltuieli(){
  document.getElementById('myCheltuieli').style.display = 'block';
}
function closeModalCheltuieli(){
  document.getElementById('myCheltuieli').style.display = 'none';
}
//Economii
function openModalEconomii(){
  document.getElementById('myEconomii').style.display = 'block';
}
function closeModalEconomii(){
  document.getElementById('myEconomii').style.display = 'none';
}



//-----UPADTE VENITURI------

function updateDataVenituri(){
  var user = firebase.auth().currentUser;
  var em = user.email;
  if (user) {
    // User is signed in.
    console.log("logat" + em);
  } else {
    // No user is signed in.
    console.log("delogat");
  }


  var database = firebase.firestore();
    var dbMail = database.collection('users').doc(em);
    var dbVenituri = dbMail.collection("dateEconomice").doc("venituri");

    
    var postDataVenituri = {
      salariu: parseInt(document.getElementById("venitSalariu").value),
      parinti: parseInt(document.getElementById("venitBursa").value),
      bursa: parseInt(document.getElementById("venitParinti").value)
    } 

    postDataVenituri.total = postDataVenituri.salariu + postDataVenituri.parinti + postDataVenituri.bursa;
    
    document.getElementById("venitTotal").innerHTML = postDataVenituri.total;

    dbVenituri.set(postDataVenituri);

    dbVenituri.get().then(function(doc) {
      if (doc.exists) {
          console.log("Salariu::", doc.data().salariu);
          console.log("Parinti:", doc.data().parinti);
          console.log("Bursa:", doc.data().bursa);
          var s = doc.data().salariu;
          var p = doc.data().parinti;
          var b = doc.data().bursa;
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}


//-----UPADTE CHELTUIELI------

function updateDataCheltuieli(){
  var user = firebase.auth().currentUser;
  var em = user.email;
  if (user) {
    // User is signed in.
    console.log("logat" + em);
  } else {
    // No user is signed in.
    console.log("delogat");
  }


  var database = firebase.firestore();
    var dbMail = database.collection('users').doc(em);
    var dbCheltuieli = dbMail.collection("dateEconomice").doc("cheltuieli");

    var postDataCheltuieli = {
      alimentare:  parseInt(document.getElementById("CheltuieliAlimentare").value),
      distractie: parseInt(document.getElementById("CheltuieliDistractie").value),
      studii: parseInt(document.getElementById("CheltuieliStudii").value),
      tehnologie: parseInt(document.getElementById("CheltuieliTehnologie").value),
      fashion: parseInt(document.getElementById("CheltuieliFashion").value),
      altele: parseInt(document.getElementById("CheltuieliAltele").value)
    }
    
    postDataCheltuieli.total = postDataCheltuieli.alimentare + postDataCheltuieli.distractie + postDataCheltuieli.fashion + postDataCheltuieli.studii + postDataCheltuieli.tehnologie + postDataCheltuieli.altele;

    document.getElementById("cheltuieliTotal").innerHTML = postDataCheltuieli.total;
    
    dbCheltuieli.set(postDataCheltuieli);

    dbCheltuieli.get().then(function(doc) {
      if (doc.exists) {
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}

//-----UPADTE ECONOMII------

function updateDataEconomii(){
  var user = firebase.auth().currentUser;
  var em = user.email;
  if (user) {
    // User is signed in.
    console.log("logat" + em);
  } else {
    // No user is signed in.
    console.log("delogat");
  }


  var database = firebase.firestore();
    var dbMail = database.collection('users').doc(em);
    var dbEconomii = dbMail.collection("dateEconomice").doc("economii");

    var postDataEconomii = {
      cuScop:  parseInt(document.getElementById("EconomiiScop").value),
      eveniment: parseInt(document.getElementById("EconomieEveniment").value),
      altele:parseInt( document.getElementById("EconomiiAltele").value)
    }
    
    postDataEconomii.total = postDataEconomii.cuScop + postDataEconomii.eveniment + postDataEconomii.altele;
    
    document.getElementById("economiiTotal").innerHTML = postDataEconomii.total;

    dbEconomii.set(postDataEconomii);

    dbEconomii.get().then(function(doc) {
      if (doc.exists) {
          
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}

