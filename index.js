firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')

    //Section: Show sign out button and handle if it's clicked

    //Section to Post Items: Post all products using the posts.js lambda function (`/.netlify/functions/posts`) and a loop to post all the posts with insterAdjacentHTML


    //Section to Create Post: If the user submits a posting, handle the click, send the information to create_post.js lambda function
    //Note: This section should go as a different file (ex: postInput.js) now that posting will be a separate page)
      //URL Format:  /.netlify/functions/create_post?userName=Brian&userId=_______&imageUrl=____&brand=____&category=_____.....
      //Info needed: brand, category, condition, delivery, photo URL, price, and description from form and usename/userId from info all from index.js

    //Section to Search and Return Results: If the user clicks the search button, send the search information to the search_posts.js lambda function (/.netlify/functions/search_posts), then clear all the innerHTML, and go through loop to insertAdjacentHTML and post only those returned by this lambda function
      //URL format: /.netlify/functions/search_posts?searchCondition=______&searchCategory=_______
      //For now I'm assuming we will just let them search for words in the title and category, but we can always scale up with more fields




  } else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
