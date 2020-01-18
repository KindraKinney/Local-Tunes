        let appkey = "b042048f34de31fadd86d7ae7af31d7e";
        let countryChoice = prompt("Enter country using ISO code (spain, canada):");        
        let queryURL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${countryChoice}&api_key=${appkey}&format=json`;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response)
            artistData = response;

            // if we get an error in repsonse to our request, alert the user the failure message reponse
            if (artistData.error == 6) {
                alert(artistData.message)
            }
            // write API response to page for top artist in user specified country
            else{
                document.write(JSON.stringify(artistData.topartists.artist[0]));
            }
        })
