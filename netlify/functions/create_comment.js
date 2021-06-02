//Goal: Provide a function to create a new comment in firebase

// Allows us to use firebase
let firebase = require('./firebase')

//For this to work, I need to be passed: userName, userId (from user info), postId (from the post), and comment body (from the form)

// Pass through this -> /.netlify/functions/create_comment?userName=Brian&userId=_______&postId=_____&commentBody=_________
exports.handler = async function(event) {

  // get the querystring parameters and store in memory
  let userName = event.queryStringParameters.userName
  let postId = event.queryStringParameters.postId
  let commentBody = event.queryStringParameters.body



  // establish a connection to Firebase in memory
  let db = firebase.firestore()

  // create a new post, wait for it to return
  // Note: cleared out comments from KelloggGram content and added 2 dummy comments to test
  await db.collection(`comments`).add({
    userName: userName,
    postId: postId,
    body: commentBody,
    created: firebase.firestore.FieldValue.serverTimestamp()
  }) 

  let returnValue = [] 
  return {
    statusCode: 200,
  }
}