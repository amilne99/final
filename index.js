
// pull all the the posts and paste them in 
 
window.addEventListener('DOMContentLoaded', async function() {

  // fetch all Json posts 

let allpostsurl = `.netlify/functions/posts`

let response = await fetch (allpostsurl)

let jsonallposts = await response.json ()

console.log (jsonallposts.length)

// Store the data and display posts

let postdiv = document.querySelector(`.postdiv`)

for (let i=0; i < jsonallposts.length; i++ ) { 

postdiv.insertAdjacentHTML(`beforeend`,`<div class=" postdiv lg:right-1/4 centered bg-white shadow p-4 rounded s:w-full s:mt-4 m:w-full m:mt-4 lg:mx-auto lg:mt-4 lg:w-1/2">
<div class="text-center mt-4">
  <p class="pickupLocation text-gray-600 font-bold">{pickupLocation}
  </p>
  <div class="flex justify-center">
    <p class="category text-sm font-hairline text-gray-600 mt-1">${jsonallposts[i].category} - 
    </p>
</div>
  <p class="postDate text-sm font-hairline text-gray-600 mt-1">{postDate}
  </p>
</div>
<div class="flex justify-center mt-4">
  <img class="postImage shadow sm:w-1/2 sm:h-1/2 w-1/2 h-1/2 square-full" src=${jsonallposts[i].imageUrl}>
</div>
<div class="mt-6 flex flex-wrap justify-between text-center">
  <div>
    <p class="text-gray-700 font-bold">Brand
    </p>
    <p class="brand text-m mt-2 text-gray-600 font-hairline">${jsonallposts[i].brand}
    </p>
  </div>
  <div>
    <p class="text-gray-700 font-bold">Price
    </p>
    <p class="price text-m mt-2 text-gray-600 font-hairline">${jsonallposts[i].price}
    </p>
  </div>
  <div>
    <p class="text-gray-700 font-bold">Condition
    </p>
    <p class="condition text-m mt-2 text-gray-700 font-hairline">${jsonallposts[i].condition}
    </p>
  </div>
  <div>
    <p class="text-gray-700 font-bold">Delivery Available?
    </p>
    <p class="delivery text-m mt-2 text-gray-700 font-hairline">${jsonallposts[i].delivery}
    </p>
  </div>
</div>
<div class="mt-6">
  <button class="rounded shadow-md w-full items-center shadow font-bold bg-purple-500 px-4 py-2 text-white hover:bg-purple-400">
    CONTACT
  </button>
</div>
<div class="addComment mt-6 border-gray-100 border-t pt-4 flex justify-between">
  <input placeholder="Add comment" class="placeholder-gray-300 text-gray-700 focus:outline-none" type="text">
  <div class="flex">
    <button class="addCommentButton rounded shadow-md items-center shadow font-bold bg-gradient-to-r from-pink-500 to-pink-500 px-4 py-2 text-white hover:bg-purple-500 ">ADD</button>
</div>
</div>
</div>`)

}

})
// firebase.auth().onAuthStateChanged(async function(user) {
  
  
//   if (user) {
//     // Signed in
//     console.log('signed in')

//     //Section: Show sign out button and handle if it's clicked

//     //Section to Post Items: Post all products using the posts.js lambda function (`/.netlify/functions/posts`) and a loop to post all the posts with insterAdjacentHTML


//     //Section to Create Post: If the user submits a posting, handle the click, send the information to create_post.js lambda function
//     //Note: This section should go as a different file (ex: postInput.js) now that posting will be a separate page)
//       //URL Format:  /.netlify/functions/create_post?userName=Brian&userId=_______&imageUrl=____&brand=____&category=_____.....
//       //Info needed: brand, category, condition, delivery, photo URL, price, and description from form and usename/userId from info all from index.js

//     //Section to Search and Return Results: If the user clicks the search button, send the search information to the search_posts.js lambda function (/.netlify/functions/search_posts), then clear all the innerHTML, and go through loop to insertAdjacentHTML and post only those returned by this lambda function
//       //URL format: /.netlify/functions/search_posts?searchCondition=______&searchCategory=_______
//       //For now I'm assuming we will just let them search for words in the title and category, but we can always scale up with more fields




//   } else {
//     // Signed out
//     console.log('signed out')

    // // Initializes FirebaseUI Auth
    // let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // // FirebaseUI configuration
    // let authUIConfig = {
    //   signInOptions: [
    //     firebase.auth.EmailAuthProvider.PROVIDER_ID
    //   ],
    //   signInSuccessUrl: 'index.html'
    // }

    // // Starts FirebaseUI Auth
    // ui.start('.sign-in-or-sign-out', authUIConfig)
  // }
// })
