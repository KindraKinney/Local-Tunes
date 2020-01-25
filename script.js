

$(document).ready(() => {
    $('#submit').on('click', () => {

      let countryCode = $("#user-input").val();
      let makeRequest = $("<script>").attr("src", `https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=jsonp&callback=response&country=${countryCode}&apikey=744d96e601e068c973cbbc1a33372ce4`)
      $("body").append(makeRequest);
    });
  });

  function response(musicData) {
    $("#output-box").empty();
    console.log(musicData)
    data = musicData;
  
            // if we get an error in repsonse to our request, alert the user the failure message reponse
            if (response.error == 6) {
                alert(response.message)
            }
            // write API response to page for top artist in user specified country
            else{
                let numOfTracks = data.message.body.track_list.length;
                let trackNameArr = [];
                let listenArr = [];
                let trackData = {
                    response: response,
                    titles: trackNameArr,
                    listens: listenArr
                }
                // iterate through each track and append the title of the track and its listen count to each array
                for (let i = 0; i < numOfTracks; i++) {
                    let currentTrack = data.message.body.track_list[i].track.track_name;
                    let currentArtist = data.message.body.track_list[i].track.artist_name;
                    let topPicks = `<div class="mdc-typography--headline6">Title: ${currentTrack}</div>
                                    <div class="mdc-typography--subtitle1">Artist: ${currentArtist}</div>                                    <br>`
                                    $("#output-box").append(topPicks);
                }
                $("#output-box").prepend("<div class='mdc-typography--headline4'>Top Tracks</div>", "<br>");
              
          }
        }
  
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
        console.log(response.results[10].address_components[0].long_name);
        $("#output-box").append(response.results[10].address_components[0].long_name);
      });
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);

  };
