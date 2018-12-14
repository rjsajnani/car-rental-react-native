const functions = require('firebase-functions');
const admin = require('firebase-admin')
const firebase = require('firebase')
var moment = require('moment');
const settings = {timestampsInSnapshots: false};
admin.initializeApp(functions.config().firebase);
admin.firestore().settings(settings);
var db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// exports.updates = functions.https.onRequest((req, res) =>{
//   console.log("*******************")
//   console.log(db.collection('cars').doc(context.params.id))
//   console.log("*******************")
  
//   console.log(req,res)
//     const currentTime = new Date()
//     // db.collection('cars').then(snap =>{
//     //   snap.forEach(childSnap =>{
//     //     console.log(childSnap.val())
//     //     var endTime = childSnap.val().endTime
//     //     console.log(email)
//     //   })
//     // })
// })

// exports.userSync = functions.firestore
//   .document('cars/{id}')
//   .onWrite((change, context) => {
//     var endTime = change.after.data().endTime;
//     var nowTime = change.after.data().nowTime;
//     var updateTime = (Math.abs(new Date(endTime._seconds * 1000) - new Date(nowTime._seconds * 1000) ))
//     var restRef = db.collection('cars').doc(context.params.id);
//     return new Promise(() => {
//       setTimeout( ()=> {
//         return db.runTransaction(transaction => {
//           return transaction.get(restRef).then(restDoc => {
//              console.log(restDoc)
//             return transaction.update(restRef, {
//               availability: true
//             });
//           });
//         });
//       },updateTime)  // to fire this function after 60 min. 
//     }) 
//     // return userDoc.set(userData);
// });


// exports.makeHttpRequest = functions.firestore
//   .document('cars/{id}').onWrite((change, context) => {
//     var endTime = change.after.data().endTime;
//     var now = new Date
//     var availability = change.after.data().availability;
//     var restRef = db.collection('cars').doc(context.params.id);
//     var rental_time =  change.after.data().rental_time;
//     rental_time = rental_time * 60 * 60;
//     console.log("(**&&**&*")
//     console.log(rental_time)
//     console.log("(**&&**&*")
    // return new Promise(() => {
    //   setTimeout( ()=> {
    //     return db.runTransaction(transaction => {
    //       return transaction.get(restRef).then(restDoc => {
    //          console.log(restDoc)
    //         return transaction.update(restRef, {
    //           availability: true
    //         });
    //       });
    //     });
    //   },rental_time)  // to fire this function after 60 min. 
    // })
// });

// exports.myFunctionName = functions.firestore
//     .document('reservations/{id}').onCreate((snap, context) => {
//       // Get an object representing the document
//       // e.g. {'name': 'Marie', 'age': 66}
//       const newValue = snap.data();
    
//       const id = newValue.id    
//       const endTime = newValue.endTime;
//       const now = Date.now();
//       // const timeOut = Math.abs(moment(now) - moment(endTime))
//       // setTimeout(function(){ console.log('called after timeout') }, 3000);
//       console.log("///////")
//       console.log(new Date(now))
//       console.log("/////////")
//       console.log("___________")
//       console.log(new Date(formatDateTime(endTime._seconds)))
//       console.log("_________")
//       console.log("+++++++++++")
//       console.log(Math.abs(new Date(now) - new Date(endTime._seconds)))
//       console.log("+++++++++++")
//       return updateCarAvailability(id)
//       // access a particular field as you would any JS property

//       // perform desired operations ...
//     });
//     function formatDateTime(input){
//       var epoch = new Date(0);
//       epoch.setSeconds(parseInt(input));
//       var date = epoch.toISOString();
//       date = date.replace('T', ' ');
//       return date.split('.')[0].split(' ')[0] + ' ' + epoch.toLocaleTimeString().split(' ')[0];
//     };
//     function updateCarAvailability(id){
//       return new Promise(() => {
//         setTimeout(function(){
//           console.log("######")
//           console.log("inside timeout")
//           console.log("######")
//            functions.firestore
//           .document('cars/3zNTEJJRmKmdavPnonyV')
//           .onWrite((change, context) => {
//             // Get an object with the current document value.
//             // If the document does not exist, it has been deleted.
//             console.log("+++++++++++")
//             console.log(change)
//             console.log("+++++++++++")
//             // perform desired operations ...
//           });
//         }, 3000);
//       });
//     };

//     exports.aggregateRatings = functions.firestore
//     .document('cars/{id}')
//     .onWrite((change, context) => {
//       // Get value of the newly added rating
//       var endTime = change.after.data().endTime;
//       var availability = change.after.data().availability;
      
//       // Get a reference to the restaurant
//       var now = new Date();
//       var restRef = db.collection('cars').doc(context.params.id);
//       var rrestReff = db.collection.where("endTime", "<=", now)
//       console.log(rrestReff)
//       // Update aggregations in a transaction
    //   return db.runTransaction(transaction => {
    //     return transaction.get(rrestReff).then(restDoc => {
    //        console.log(restDoc)
    //       // Compute new number of ratings
    //       // var endTime = restDoc.data('endTime');
    //       // var newAvailability= false
    //       // if(endTime <= now){
    //         var newAvailability = true
    //       // }
    //       // Compute new average rating
    //       // var oldRatingTotal = restDoc.data('avgRating') * restDoc.data('numRatings');
    //       // var newAvgRating = (oldRatingTotal + ratingVal) / newNumRatings;

    //       // Update restaurant info
    //       return transaction.update(restRef, {
    //         availability: newAvailability
    //       });
    //     });
    //   });
    // });   
// exports.upDateAviableCars = functions.firestore.document('reservations/{id}').onWrite(async (change) => {
//   const ref = change.after.ref.parent; // reference to the parent
//   console.log(ref)
//   const now = Date.now();
//   console.log(now)
  // const cutoff = now - CUT_OFF_TIME;
  // const oldItemsQuery = ref.orderByChild('timestamp').endAt(cutoff);
  // const snapshot = await oldItemsQuery.once('value');
  // create a map with all children that need to be removed
  // const updates = {};
  // snapshot.forEach(child => {
    // updates[child.key] = null;
  // });
  // execute all updates in one go and return the result to end the function
  // return ref.update(updates);
// });