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
  var data = req.body;
  console.log(data, '======');
    client
      .pushMessage('U61ed7c0ea5f5217bc8b8ed7f5f822ba1', {
      type: "text",
      text: "Hello World!",
    })
      .then(() => {
        console.log('send message success!!!');
      })
      .catch((err: any) => {
        // error handling
        console.log('🚀 ~ file: Login.tsx ~ line 21 ~ sendMessage ~ err', err);
      });
  
  
});

exports.checkFirestore = functions.firestore.document('/appointment/{documentId}')
  .onCreate((snap, context) => {
    const newValue = snap.data();
    const myname = newValue.myname;
    const yourname = newValue.yourname;
    const uid = newValue.uid
    const message =
      `【相性診断が完了致しました。】
    ${myname}さんと${yourname}さんの相性は...70%です！！`
    client
      .pushMessage(uid, {
      type: "text",
      text: message,
    })
      .then(() => {
        console.log('send message success!!!');
      })
      .catch((err: any) => {
        // error handling
        console.log('🚀 ~ file: Login.tsx ~ line 21 ~ sendMessage ~ err', err.message);
      });
    // client
    //   .pushMessage(uid, {
    //   type: "text",
    //   text: `${myname}さんの好きな方は${yourname}さんでした`,
    // })
    //   .then(() => {
    //     console.log('send message success!!!');
    //   })
    //   .catch((err: any) => {
    //     // error handling
    //     console.log('🚀 ~ file: Login.tsx ~ line 21 ~ sendMessage ~ err', err.message);
    //   });
  })

//   const flexMessage = (replyToken: string, userName: string, userIMG: string) => {
//   // replyするメッセージの定義
//   var postData = {
//     "replyToken" : replyToken,
//     "messages" : [
//       {
//   "type": "flex",
//   "altText": "Flex Message",
//   "contents": {
//     "type": "bubble",
//     "hero": {
//       "type": "image",
//       "url": userIMG,
//       "size": "full",
//       "aspectRatio": "20:13",
//       "aspectMode": "cover",
//       "action": {
//         "type": "uri",
//         "label": "Line",
//         "uri": "https://linecorp.com/"
//       }
//     },
//     "body": {
//       "type": "box",
//       "layout": "vertical",
//       "contents": [
//         {
//           "type": "text",
//           "text": userName+"さん",
//           "size": "xl",
//           "weight": "bold"
//         },
//         {
//           "type": "box",
//           "layout": "baseline",
//           "margin": "md",
//           "contents": [
//             {
//               "type": "text",
//               "text": "順番待ちを受付けました。",
//               "flex": 0,
//               "margin": "md",
//               "size": "md",
//               "color": "#000000"
//             }
//           ]
//         }
//       ]
//     },
//     "footer": {
//       "type": "box",
//       "layout": "vertical",
//       "flex": 0,
//       "spacing": "sm",
//       "contents": [
//         {
//           "type": "button",
//           "action": {
//             "type": "message",
//             "label": "順番待ち確認",
//             "text": "順番"
//           },
//           "height": "sm",
//           "style": "link"
//         },
//         {
//           "type": "spacer",
//           "size": "sm"
//         }
//       ]
//     }
//   }
// }
//     ]
//   };
//   return postMessage(postData);
//   }

  //FlexMessageの作成
// function push() {

//   var url = "https://api.line.me/v2/bot/message/push";
//   var headers = {
//     "Content-Type" : "application/json; charset=UTF-8",
//     'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
//   };
//   var postData = {
//     "to" : to,
//     "messages" : [
//       {
//   "type": "flex",
//   "altText": "順番が来ました。",
//   "contents": {
//     "type": "bubble",
//     "hero": {
//       "type": "image",
//       "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
//       "size": "full",
//       "aspectRatio": "20:13",
//       "aspectMode": "cover",
//       "action": {
//         "type": "uri",
//         "label": "Line",
//         "uri": "https://linecorp.com/"
//       }
//     },
//     "body": {
//       "type": "box",
//       "layout": "vertical",
//       "contents": [
//         {
//           "type": "text",
//           "text": "順番になりました",
//           "size": "xl",
//           "weight": "bold"
//         },
//         {
//           "type": "box",
//           "layout": "baseline",
//           "margin": "md",
//           "contents": [
//             {
//               "type": "text",
//               "text": "＊＊＊分以内にお越しください。",
//               "flex": 0,
//               "margin": "md",
//               "size": "sm",
//               "color": "#F60404"
//             }
//           ]
//         },
//         {
//           "type": "box",
//           "layout": "vertical",
//           "spacing": "sm",
//           "margin": "lg",
//           "contents": [
//             {
//               "type": "box",
//               "layout": "baseline",
//               "spacing": "sm",
//               "contents": [
//                 {
//                   "type": "text",
//                   "text": "Place",
//                   "flex": 1,
//                   "size": "sm",
//                   "color": "#AAAAAA"
//                 },
//                 {
//                   "type": "text",
//                   "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
//                   "flex": 5,
//                   "size": "sm",
//                   "color": "#666666",
//                   "wrap": true
//                 }
//               ]
//             },
//             {
//               "type": "box",
//               "layout": "baseline",
//               "spacing": "sm",
//               "contents": [
//                 {
//                   "type": "text",
//                   "text": "Time",
//                   "flex": 1,
//                   "size": "sm",
//                   "color": "#AAAAAA"
//                 },
//                 {
//                   "type": "text",
//                   "text": "10:00 - 23:00",
//                   "flex": 5,
//                   "size": "sm",
//                   "color": "#666666",
//                   "wrap": true
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     "footer": {
//       "type": "box",
//       "layout": "vertical",
//       "flex": 0,
//       "spacing": "sm",
//       "contents": [
//         {
//           "type": "button",
//           "action": {
//             "type": "uri",
//             "label": "CALL",
//             "uri": "https://linecorp.com"
//           },
//           "height": "sm",
//           "style": "link"
//         },
//         {
//           "type": "button",
//           "action": {
//             "type": "uri",
//             "label": "WEBSITE",
//             "uri": "https://linecorp.com"
//           },
//           "height": "sm",
//           "style": "link"
//         },
//         {
//           "type": "spacer",
//           "size": "sm"
//         }
//       ]
//     }
//   }
// }
//     ]
//   };

//   var options = {
//     "method" : "post",
//     "headers" : headers,
//     "payload" : JSON.stringify(postData)
//   };

//   return UrlFetchApp.fetch(url, options);
// }