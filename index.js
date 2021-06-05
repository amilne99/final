
// pull all the the posts and paste them in 
 
firebase.auth().onAuthStateChanged(async function(user) {

  if (user) {

    console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mx-2 my-2 px-4 rounded focus:outline-none focus:shadow-outline sign-out">Sign Out</button>
    `

    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the home page
      document.location.href = `index.html`
    })

    // Build the markup for the new post button and set the HTML in the header
    document.querySelector(`.newpost`).innerHTML = `
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold mx-2 my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline sign-out">New Post</button>
    `

    // get a reference to the new post button
    let newpostButton = document.querySelector(`.newpost`)

    // handle the new post button click - redirect to postinput page
    newpostButton.addEventListener(`click`, function(event) {

      document.location.href = `postInput.html`

    })

    // fetch all Json posts 

  let allpostsurl = `.netlify/functions/posts`

  let response = await fetch (allpostsurl)

  let jsonallposts = await response.json ()

  console.log (jsonallposts.length)



  // Store and display posts

  let postdiv = document.querySelector(`.postdiv`)

  for (let i=0; i < jsonallposts.length; i++ ) { 

    let post = jsonallposts[i]
    
    let postId = jsonallposts[i].id

    let comments = ``

    for (let i=0; i< post.comments.length; i++) {
    
    let comment = post.comments[i]

    comments = comments + `<div><strong>${comment.userName} : </strong> ${comment.body}</div>`

  }
  
  console.log(post.created)
  let dateFunction = Date(post.created.seconds)
  //let actualDate = date.getDate()
  console.log(dateFunction)
  //console.log(actualDate)
 
  postdiv.insertAdjacentHTML(`beforeend`,`<div class=" postdiv lg:right-1/4 centered bg-white shadow p-4 rounded s:w-full s:mt-4 m:w-full m:mt-4 lg:mx-auto lg:mt-4 lg:w-3/4">
  <div class="text-center mt-4">
    <div class="flex justify-center">
      <p class="category text-l font-hairline font-bold text-gray-600 mt-1">${jsonallposts[i].category} 
      </p>
  </div>
    <p class="postDescription text-m font-hairline text-gray-600 mt-1">${jsonallposts[i].description}
    </p>
  </div>
  <div class="flex justify-center mt-4">
    <img class="postImage shadow w-1/2 h-1/2 sm:w-1/2 sm:h-1/2 square-full" src=${jsonallposts[i].imageUrl}>
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
    <form>
      <button class="contact-button-${postId} rounded shadow-md w-full items-center shadow font-bold bg-purple-500 px-4 py-2 text-white hover:bg-purple-400">CONTACT</button>
    </form>  
  </div>

  ${comments}

  <div class="addComment mt-6 border-gray-100 border-t pt-4 flex justify-between">
    <input placeholder="Add comment" class="comment-${postId} placeholder-gray-300 text-gray-700 focus:outline-none" type="text">
    <div class="flex">
      <button class="post-comment-button-${postId} addCommentButton rounded shadow-md items-center shadow font-bold bg-gradient-to-r from-pink-500 to-pink-500 px-4 py-2 text-white hover:bg-purple-500 ">ADD</button>
  </div>
  </div>
  </div>`)

  // Add new comments

  let postCommentButton = document.querySelector(`.post-comment-button-${postId}`)

  postCommentButton.addEventListener(`click`, async function(event) {

    event.preventDefault()
    
    console.log("someone clicked")
    // get a reference to the newly created comment input
    let commentInput = document.querySelector(`.comment-${postId}`)

    // get the body of the comment
    let commentBody = commentInput.value

    // Build the URL for our comments API

    let url = `/.netlify/functions/create_comment?userName=${user.displayName}&userId=${user.uid}&postId=${postId}&commentBody=${commentBody}`

    await fetch(url)

    location.reload ()

})

  let contactButton = document.querySelector(`.contact-button-${postId}`)
  

  contactButton.addEventListener(`click`, async function(event) {

    event.preventDefault()
    
    console.log("someone clicked contact")

    let contactdiv = document.querySelector(`.testContact`)

    postdiv.insertAdjacentHTML(`afterbegin`,`<div class="text-center p-6"> You can reach the person who posted this ${jsonallposts[i].category} at: <strong>${jsonallposts[i].userEmail}<strong></div>`)

  }) 
 
}

}

  else {
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
