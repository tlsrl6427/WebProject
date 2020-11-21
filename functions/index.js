const funtions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(funtions.config().firebase);

exports.addMessage = funtions.https.onRequest((req, res)=>{
  const original = req.query.txt;
  admin.database().ref('/messages').push({original: original}).then(snapshot =>{
    res.redirect(303, snapshot.ref);
  });
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
