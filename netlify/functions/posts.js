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
  let postsQuery = await db.collection(`posts`.orderBy(`created`,`desc`).get())

  // retrieve the documents from the query
  let posts = postsQuery.docs

  //loop through the post documents
  for (let i=0;i<posts.length;i++)

    // get the ID from the doc
    let postId = posts[i].id

    // get the data from the doc
    let postData = posts[i].data()

    // create an Object to be added to the return value
    let postObject = {
      userName: userName,
      userId: userId,
      category: category,
      brand: brand,
      condition: condition,
      delivery: delivery,
      imageUrl: imageUrl,
      price: price,
      description: description
    }
    // add the Object to the return value
    returnValue.push(postObject)

  // Return the value of our lambda
  let returnValue = [] 
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}