var getUserRepos = function(data){
    // this is formatting the github api url
    var apiUrl = "http://dog-api.kinduff.com?nummber=5";

    // make a request to the url
    fetch(apiUrl)
        .then(function(response){
            // request successful
            if(response.ok){
                response.json().then(function(data){
                    displayRepos(data);
                });
            } else{
                alert("Error: Github User Not Found");
            }
        })
        .catch(function(error){
            // Notice this .catch()  getting chained onto the end of the .then() method
            alert ("unable to connect to Github");
        });
        
};

getUserRepos();
console.log(data);
