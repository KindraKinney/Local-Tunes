
$(document).ready(() => {
    $('#submit').on('click', () => {

      let countryCode = prompt("Please enter country (ISO CODE)");
      let makeRequest = $("<script>").attr("src", `https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=jsonp&callback=response&country=${countryCode}&apikey=744d96e601e068c973cbbc1a33372ce4`)
      $(document).append(makeRequest);

      function response(musicData) {
        let data = responseData;
        let title = data.message.body.track_list[1].track
        document.write(title)
        let artist = data.message.body.track_list[1].track.artist_name
        document.write(artist)
      }
    
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
                    trackNameArr.push(currentTrack);
                    // listenArr.push(currentListen);
                    trackNameArr.push(`Listens: ${currentListen}`);
                    trackNameArr.push("<br>");
                }
                // push title and listen count data to screen
                document.write(JSON.stringify(trackData.titles));
  
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
  
  let button = document.getElementById("get-location");
  let latText = document.getElementById("latitude");
  let longText = document.getElementById("longitude");
  
  button.addEventListener("click", function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
  
      latText.innerText = lat.toFixed(2);
      longText.innerText = long.toFixed(2);
    });
  });
  
  function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  }
  
  
  
    //JQUERY FUNCTION FOR SETTING SONGNAME AND ARTIST NAME TO OUTPUTBOX DIV//
  //   function outputBox(){
  
  // let songName = "mmmBop";
  // let artistName = "Hansen";
  // let mainInfo = $("<div class='output-box'>");
  // let songDiv = $("<div class='song'>");
  // $(songDiv).addClass("mdc-typography--headline6")
  // let artistDiv = $("<div class='artist'>");
  // $(artistDiv).addClass("mdc-typography--subtitle1");
  // let pOne = $("<p>").text("Song Title: " + songName);
  // songDiv.append(pOne);
  // mainInfo.append(songDiv);
  // let pTwo = $("<p>").text("Artist Name: " + artistName);
  // artistDiv.append(pTwo);
  // mainInfo.append(artistDiv);
  // $("#output-box").prepend(mainInfo);
  // }
  
  
  // outputBox();
  