function getDogFact() {
    // {city name}&cnt={cnt}&appid={API key}
    var dogFactUrl = "https://dog-api.kinduff.com/api/facts?number=5&mode=no-cors"
//    call for the current weather
    fetch(dogFactUrl).then(function(response) {
    
        if (response.ok) {
         return response.json().then(function(data) {
            console.log(data);
           

        });
        }
})

};

getDogFact();