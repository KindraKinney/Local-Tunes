
$(document).ready(() => {
  $('#submit').on('click', () => {

    const appkey = "b042048f34de31fadd86d7ae7af31d7e";
    const countryChoice = $('#user-input').val();
    const queryURL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${countryChoice}&api_key=${appkey}&format=json`;

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
            // create an object that holds relevant data responses from API
            let artistData = {
            response: response,
            error: response.error,
            errorMsg: response.message,
            artistName: response.topartists.artist[0].name,
            images: response.topartists.artist[0].image[0]["#text"],
            listeners: response.topartists.artist[0].listeners
            }

            function outputBox(){

              let songName = "mmmBop";
              let artistName = "Hansen";
              let mainInfo = $("<div class='output-box'>");
              let songDiv = $("<div class='song'>");
              $(songDiv).addClass("mdc-typography--headline6")
              let artistDiv = $("<div class='artist'>");
              $(artistDiv).addClass("mdc-typography--subtitle1");
              let pOne = $("<p>").text("Song Title: " + songName);
              songDiv.append(pOne);
              mainInfo.append(songDiv);
              let pTwo = $("<p>").text("Artist Name: " + artistName);
              artistDiv.append(pTwo);
              mainInfo.append(artistDiv);
              $("#output-box").prepend(mainInfo);
              }

              outputBox();
        }
    });
  });


});

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}