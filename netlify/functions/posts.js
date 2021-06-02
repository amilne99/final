// Goal: Pull all posts from Firebase and return them as an object to index.js

// To add: Allow to pass through search criteria and vary pull from Firebase based on it or cover with conditional in the loop (may be easier to use include)
//         Could also allow users to filter by different categories, ascending/descending and pass that through in the postQuery

// allows us to use firebase
let firebase = require('./firebase')

// /.netlify/functions/posts
exports.handler = async function(event) {

  // define an empty Array to hold the return value from lambda
  let returnValue = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all posts, wait for it to return, store in memory
  let postsQuery = await db.collection(`posts`).get()

  // retrieve the documents from the query
  let posts = postsQuery.docs

  //loop through the post documents
  for (let i=0;i<posts.length;i++)

{    // get the ID from the doc
    
    let postId = posts[i].id

    // get the data from the doc
    let postData = posts[i].data()

    // create an Object to be added to the return value
    let postObject = {
      userName: postData.userName,
      userId: postData.userId,
      category: postData.category,
      brand: postData.brand,
      condition: postData.condition,
      delivery: postData.delivery,
      imageUrl: postData.imageUrl,
      price: postData.price,
      description: postData.description,
      created : postData.created,
      comments: []
    }
        // get the comments for the given post, wait for it to return and store in memory
        let commentsQuery = await db.collection(`comments`).where(`postId`, `==`, postId).get()

        // get the documents from the query
        let comments = commentsQuery.docs
    
        // loop through the comment documents
        for (let j=0; j < comments.length; j++) {
          // get the id from the comment document
          let commentId = comments[j].id
    
          // get the data from the documents
          let commentData = comments[j].data()
    
         // create an object for the comment
          let commentObject = {
            id: commentId,
            userName: commentData.userName,
            body: commentData.body
          }
        // push to the object
        postObject.comments.push(commentObject)
        }
    // add the Object to the return value
    returnValue.push(postObject)
  }
  // Return the value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}