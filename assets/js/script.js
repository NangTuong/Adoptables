var factSpan = document.querySelector("#dog-fact");
var factBtn = document.querySelector("#fact-btn");

var dogFacts = [];

var getDogFact = function() {
<<<<<<< HEAD
    var dogFactApiUrl = "https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/?number=100";
=======
    var dogFactApiUrl = "https://cors-anywhere.herokuapp.com/https://dog-api.kinduff.com/api/facts?number=10";
>>>>>>> d11030ba7c7cc8c84b5373ec9c8204a6942d37e8
    fetch(dogFactApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {                
                dogFacts.push(data);
                console.log(dogFacts);
            });
        } else {
            factSpan.textContent = "Sorry! Dog facts not available at this time!"
        }
    })
<<<<<<< HEAD
    .catch(function(error) {
        factSpan.textContent = "Unable to connect to Dog Facts at this time"
    });
=======
    .catch(function(error){
        factSpan.textContent="Dog facts unavailble at this time!";
    })
>>>>>>> d11030ba7c7cc8c84b5373ec9c8204a6942d37e8
};

var displayFact = function() {
    var fact = dogFacts[0].facts[Math.floor(Math.random() * (dogFacts[0].facts).length)];
    console.log(fact);
   factSpan.textContent= fact; 
};



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
        getDog(data.access_token);
    })
};

var getDog = function(token){
    var url = "https://api.petfinder.com/v2/animals?type=dog";
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
    // add local storage
}

getToken();


factBtn.addEventListener("click", displayFact);
getDogFact();

