// Goal: Return select posts from Firebase based on search criterion/criteria passed through
// Note: This uses two different searches: exact match for category and includes for condition. 


// allows us to use firebase
let firebase = require('./firebase')

// /.netlify/functions/search_posts?searchCategory=______&searchCondition=_______
exports.handler = async function(event) {

// get the querystring parameters and store in memory
  let searchCondition = event.queryStringParameters.searchCondition
  let searchCategory = event.queryStringParameters.searchCategory
console.log(searchCategory)
  // define an empty Array to hold the return value from lambda
  let returnValue = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all posts matching the criteria passed through, wait for it to return, store in memory
  let postsQuery = await db.collection(`posts`).where(`category`,`==`,searchCategory).get()

  let posts = postsQuery.docs

  //loop through the post documents
  for (let i=0;i<posts.length;i++){

    // get the ID from the doc
    let postId = posts[i].id

    // get the data from the doc
    let postData = posts[i].data()

    if(postData.condition.includes(searchCondition)){
    
    postObject = {
        id: postId,  
        userName: postData.userName,
        userId: postData.userId,
        category: postData.category,
        brand: postData.brand,
        condition: postData.condition,
        delivery: postData.delivery,
        imageUrl: postData.imageUrl,
        price: postData.price,
        description: postData.description
          }
        // add the Object to the return value
    returnValue.push(postObject)
        }
    }
  // Return the value of our lambda
  
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }


}
