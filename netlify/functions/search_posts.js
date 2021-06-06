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
  let postsQuery = await db.collection(`posts`).orderBy(`created`, `desc`).get()
//.where(`category`,`==`,searchCategory)
  let posts = postsQuery.docs

  //loop through the post documents
  for (let i=0;i<posts.length;i++){

    // get the ID from the doc
    let postId = posts[i].id

    // get the data from the doc
    let postData = posts[i].data()

    if((postData.condition.includes(searchCondition)||(searchCondition==undefined))&&
    (postData.category.includes(searchCategory)||(searchCategory==undefined))
    ){
    
    postObject = {
        id: postId,  
        userName: postData.userName,
        userEmail: postData.userEmail,
        userId: postData.userId,
        category: postData.category,
        brand: postData.brand,
        condition: postData.condition,
        delivery: postData.delivery,
        imageUrl: postData.imageUrl,
        price: postData.price,
        description: postData.description,
        created: postData.created,
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
    }
  // Return the value of our lambda
  
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }


}
