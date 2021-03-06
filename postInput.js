firebase.auth().onAuthStateChanged(async function(user) {

    if (user) {

 // get a reference to the "Create Post" button
 let createPostButton = document.querySelector(`.createPost`)

 // handle the clicking of the "Create Post" button
    createPostButton.addEventListener(`click`, async function(event) {
   
    // prevent the default behavior (submitting the form)
    event.preventDefault()
    
    // Get a reference to the input holding the category
    let categoryInput = document.querySelector(`#typeCreatePost`)
 
    // store the user-inputted Category in memory
    let category = categoryInput.value
    
    // Get a reference to the input holding the description
    let descriptionInput = document.querySelector(`#description`)
 
    // store the user-inputted description in memory
    let description = descriptionInput.value

    // Get a reference to the input holding the image URL
    let imageUrlInput = document.querySelector(`#imageURL`)
 
    // store the user-inputted Image URL in memory
    let imageURL = imageUrlInput.value

    // Get a reference to the input holding the price
    let priceInput = document.querySelector(`#price`)
 
    // store the user-inputted price in memory
    let price = priceInput.value

    // Get a reference to the input holding the brand
    let brandInput = document.querySelector(`#brand`)
 
    // store the user-inputted brand in memory
    let brand = brandInput.value

     // Get a reference to the input holding the delivery
     let deliveryInput = document.querySelector(`#deliveryCreatePost`)
 
     // store the user-inputted delivery in memory
     let delivery = deliveryInput.value

     // Get a reference to the input holding the condition
     let conditionInput = document.querySelector(`#conditionCreatePost`)
 
     // store the user-inputted delivery in memory
     let condition = conditionInput.value

    // create the URL for our "create post" lambda function
    let url = `/.netlify/functions/create_post?userName=${user.displayName}&userId=${user.uid}&userEmail=${user.email}&category=${category}&brand=${brand}&condition=${condition}&delivery=${delivery}&imageUrl=${imageURL}&price=${price}&description=${description}`

    // fetch the URL, wait for the response, store the response in memory

    let response = await fetch(url)

    // Send user to Home page
    
    document.location.href = `index.html`

})

}
else {

    document.location.href = `index.html`
    
}

})