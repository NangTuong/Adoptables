// targets elements on the html
var factSpan = document.querySelector("#dog-fact");
var factBtn = document.querySelector("#fact-btn");
var userZipCode = document.querySelector("#user-zip");
var userForm= document.querySelector("#user-form");
var userDog = document.querySelector("#fetch-dog-api");
var userCat = document.querySelector("#fetch-cat-api");
var editUserZip = document.querySelector("#edit-zip");
var userButtons = document.querySelector("#user-buttons");

// sets an array for the dog facts
var dogFacts = [];

// api fetch to retrieve dog facts
var getDogFact = function() {
    var dogFactApiUrl = "https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/?number=20";
    fetch(dogFactApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {                
                dogFacts.push(data);
            });
        } else {
            factSpan.textContent = "Sorry! Dog facts not available at this time!"
        }
    })
    .catch(function(error) {
        factSpan.textContent = "Unable to connect to Dog Facts at this time"
    });
};

//function to display the dogs facts
var displayFact = function() {
    var fact = dogFacts[0].facts[Math.floor(Math.random() * (dogFacts[0].facts).length)];
   factSpan.textContent= fact; 
};

// function to get token to make animal api calls and store it to local storage
var getToken = function(){
    var url = "https://api.petfinder.com/v2/oauth2/token";
    fetch(url, {
        method:"post",
        body: "grant_type=client_credentials&client_id=vQGWniAcJTVR7FPzWWR77YyrmNnOaZ5RtzoEAnLGBmNwBEGKpo&client_secret=uSRpQnsKOJbvtEkr9LdteF1izemRN9CG6yhnzNFT",
        headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded"
        })
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var token =data.access_token;
        localStorage.setItem("token", JSON.stringify(token));
    })
};

// function to compile all user inputs
var userInfo = function(event) {
    var token= localStorage.getItem("token");
    token = JSON.parse(token);
    var userLocation = localStorage.getItem("user-location");
    userLocation = JSON.parse(userLocation);
    var userAnimal = event.target.getAttribute("userAnimal");
    getPets(token, userLocation, userAnimal);
}

// function to call for animal information from petfinder
var getPets = function(token, userLocation, userAnimal){
    var url = "https://api.petfinder.com/v2/animals?location="+ userLocation +"&type="+ userAnimal;
    fetch(url, {
        method:"get",
        headers: new Headers({
            "Authorization": "Bearer " + token
        })
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
};

//  takes user input and stores to local
var formSubmitHandler = function(event) {
    event.preventDefault();
    var userLocation = userZipCode.value.trim();

    if (userLocation) {
        userZipCode.value = "";
    } else {
        userZipCode.value = "Please enter your Zip Code"
    };
    localStorage.setItem("user-location", JSON.stringify(userLocation));
    userForm.setAttribute("class", "hide");
    userButtons.removeAttribute("class", "hide");
    getToken();
};

// Displays the user zip form, hides the fetch buttons
var editLocation = function() {
    userForm.removeAttribute("class", "hide");
    userButtons.setAttribute("class", "hide");
};

// call function to load dog facts on page load
getDogFact();

// Event Listeners
userForm.addEventListener("submit", formSubmitHandler);
editUserZip.addEventListener("click", editLocation);
factBtn.addEventListener("click", displayFact);
userDog.addEventListener("click", userInfo);
userCat.addEventListener("click", userInfo);





