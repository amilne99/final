//Goal: Provide a function to create a new post in Firebase

// Allows us to use firebase
let firebase = require('./firebase')

// To add: What to do if some of the fields are left blank? Pass through with blanks or return error message? 

//For this to work, I need to be passed: title, brand, category, condition, delivery, dimension_h, dimension_l, dimension_w, photo, price, and description from form and usename/userId from info all from index.js

// Pass through this -> /.netlify/functions/create_post?userName=Brian&userId=_______&imageUrl=____&title=____&category=_____.....
exports.handler = async function(event) {

  // get the querystring parameters and store in memory
  let userName = event.queryStringParameters.userName
  let userId = event.queryStringParameters.userId
  let title = event.queryStringParameters.title
  let category = event.queryStringParameters.category
  let brand = event.queryStringParameters.brand
  let condition = event.queryStringParameters.condition
  let delivery = event.queryStringParameters.delivery
  let dimension_h = event.queryStringParameters.dimension_h
  let dimension_l = event.queryStringParameters.dimension_l
  let dimension_w = event.queryStringParameters.dimension_w
  let imageUrl = event.queryStringParameters.imageUrl
  let price = event.queryStringParameters.price
  let description = event.queryStringParameters.desription


  // establish a connection to Firebase in memory
  let db = firebase.firestore()

  // create a new post, wait for it to return
  // Note: cleared out posts from KelloggGram content. Could also use "posts_final" to avoid confusion
  await db.collection(`posts`).add({
    userName: userName,
    userId: userId,
    title: title,
    category: category,
    condition: condition,
    delivery: delivery,
    dim_h: dimension_h,
    dim_l: dimension_l,
    dim_w: dimension_w,
    imageUrl: imageUrl,
    price: price,
    description: description,
    brand: brand,
    created: firebase.firestore.FieldValue.serverTimestamp()
  }) 

  let returnValue = [] // sample only...
  return {
    statusCode: 200,
  }
}