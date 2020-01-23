
$(document).ready(() => {
    $('#submit').on('click', () => {
  
        const appkey = "b042048f34de31fadd86d7ae7af31d7e";
        const countryChoice = $('#user-input').val();       
        const numOfTracks = 5;
        // let queryURL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${countryChoice}&api_key=${appkey}&format=json`;
        let queryURL = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=${numOfTracks}&country=${countryChoice}&api_key=${appkey}&format=json`;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response)
    
            // if we get an error in repsonse to our request, alert the user the failure message reponse
            if (response.error == 6) {
                alert(response.message)
            }
            // write API response to page for top artist in user specified country
            else{
                let trackNameArr = [];
                let listenArr = [];
                let trackData = {
                    response: response,
                    titles: trackNameArr,
                    listens: listenArr
                }
                // iterate through each track and append the title of the track and its listen count to each array
                for (let i = 0; i < numOfTracks; i++) {
                    let currentTrack = response.tracks.track[i].name;
                    let currentListen = response.tracks.track[i].listeners;
                    let currentArtist = response.tracks.track[i].artist.name;
                    let topPicks = `<div class="mdc-typography--headline6">Title: ${currentTrack}</div>
                                    <div class="mdc-typography--subtitle1">Artist: ${currentArtist}</div>
                                    <div class="mdc-typography--subtitle1">Listen Count: ${currentListen}</div>
                                    <br>`
                                    $("#output-box").append(topPicks);
                }
                $("#output-box").prepend("<div class='mdc-typography--headline4'>Top Tracks</div>", "<br>");
              
          }
      });
    });
  
  
  });
  
  window.onload = function() {
    var startPos;
    var geoSuccess = function(position) {
      startPos = position;
      latlng = startPos.coords.latitude + ',' + startPos.coords.longitude;
      APIkey = "AIzaSyDrCceye243-Te4hjHSsc7h3LcwzY-1xeI";
      queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&key=" + APIkey;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(response => {
        console.log(response.results[7].address_components[0].long_name);
      });
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);

  };