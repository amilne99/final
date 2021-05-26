// Goal: Return select posts from Firebase based on search criterion/criteria passed through

// allows us to use firebase
let firebase = require('./firebase')

// /.netlify/functions/search_posts?searchTitle=______&searchCategory=_______
exports.handler = async function(event) {

// get the querystring parameters and store in memory
  let searchTitle = event.queryStringParameters.searchTitle
  let searchCategory = event.queryStringParameters.searchCategory


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

    if ( //Conditional to check if a post matches the search title and category or just the search title if the category search is blank or just the category if the title search is blank
        (postData.title.includes(searchTitle) && postData.category.includes(searchCategory)) || 
        ((searchTitle = undefined || searchTitle.length == 0) && postData.category.includes(searchCategory))
        ((searchCategory = undefined || searchCategory.length == 0) && postData.category.includes(searchTitle))
        ) {
        // If the post matches, create an object and populate it with the relevant fields
        postObject = {
            userName: userName,
            userId: userId,
            title: title,
            category: category,
            brand: brand,
            condition: condition,
            delivery: delivery,
            dim_h: dim_h,
            dim_l: dim_l,
            dim_w: dim_w,
            imageUrl: imageUrl,
            price: price,
            description: description
          }
        // add the Object to the return value
    returnValue.push(postObject)

      }

  // Return the value of our lambda


  let returnValue = [] // sample only...
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}