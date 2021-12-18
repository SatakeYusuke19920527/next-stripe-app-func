import * as functions from "firebase-functions";
import * as line from '@line/bot-sdk';

require('dotenv').config();

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!
};

const client = new line.Client(config);

exports.helloworld = functions.https.onRequest(async (req, res) => {
  // Send back a message that we've successfully written the message
  res.json({result: `Hello world`});
});

exports.checkFirestore = functions.firestore.document('/appointment/{documentId}')
  .onCreate((snap, context) => {
    const newValue = snap.data();
      // access a particular field as you would any JS property
    const name = newValue.name;
    const message =
      `【予約が完了致しました。】
    ${name}様
    ご予約誠にありがとうございます！
    ${newValue.date}にお会いできることを楽しみにしております！
    satake
    `
        client.broadcast({
          type: "text",
          text: message
        }).then(data => console.log(data))
          .catch(e => console.log(e))
})

// // Take the text parameter passed to this HTTP endpoint and insert it into
// // Firestore under the path /messages/:documentId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await admin.firestore().collection('messages').add({original: original});
//   // Send back a message that we've successfully written the message
//   res.json({result: `Message with ID: ${writeResult.id} added.`});
// });

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions.firestore.document('/appointment/{documentId}')
//     .onCreate((snap, context) => {
//       // Grab the current value of what was written to Firestore.
//       const original = snap.data().original;

//       // Access the parameter `{documentId}` with `context.params`
//       functions.logger.log('Uppercasing', context.params.documentId, original);

//       const uppercase = original.toUpperCase();

//       // You must return a Promise when performing asynchronous tasks inside a Functions such as
//       // writing to Firestore.
//       // Setting an 'uppercase' field in Firestore document returns a Promise.
//       return snap.ref.set({uppercase}, {merge: true});
// });