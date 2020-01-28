const response = musicData => {
  $('#output-box').empty();
  let data = musicData;
  numOfTracks = data.message.body.track_list.length;

  for (let i = 0; i < numOfTracks; i++) {
    const currentTrack = data.message.body.track_list[i].track.track_name;
    const currentArtist = data.message.body.track_list[i].track.artist_name;
    const currentAlbum = data.message.body.track_list[i].track.album_name;
    const albumURL = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=b042048f34de31fadd86d7ae7af31d7e&autocorrect=1&artist=${currentArtist}&album=${currentAlbum}&format=json`;

    $.ajax({
      url: albumURL,
      method: 'GET'
    }).then(response => {
      const art = response.album.image[4]['#text'];
      const topPicks = `
        <div class="mdc-card" style='flex: 0 1 32%; margin-bottom: 8px'>
          <div class="mdc-card__media mdc-card__media--square demo-card__media" style="background-image: url(&quot;${art};);"></div>
          <div class="card__primary">
            <h2 class="mdc-typography mdc-typography--headline6">${currentTrack}</h2>
            <h3 class="mdc-typography mdc-typography--subtitle2">${currentArtist}</h3>
          </div>
        </div>
      `

      $('#output-box').append(topPicks);
    });
  }

  const topSongs = `
    <div class='mdc-typography--headline4' style='color: #6240bc' margin: 8px; text-align: center;'>Top Tracks</div>
  `;
  const loadMore = `
    <button class='mdc-button'>
      <div class='mdc-button__ripple' id='more'></div>
      <span class='mdc-button__label'>Load More</span>
    </button>
  `;

  $('#title').empty();
  $('#title').append(topSongs);
  $('#load-box').empty();
  $('#load-box').append(loadMore);
  $('#more').on('click', () => {
    getMore();
  });
}

// Used to convert our country names to iso for later and each first char must be uppercase
function capitalizeCountry(country)
{
 return country.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function countryToIso(country) {
  for (country in countryNames) {
    console.log("Key: " + country);
    console.log("Value: " + countryNames[country]);
}
}
const getMore = () => {
  // Adds more results to the page...
}

$(document).ready(() => {
  const inputPosition = () => {
    let startPos;
    const geoSuccess = position => {
      startPos = position;
      const latlng = startPos.coords.latitude + ',' + startPos.coords.longitude;
      const APIkey = 'AIzaSyDrCceye243-Te4hjHSsc7h3LcwzY-1xeI';
      const queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?result_type=country&latlng=' + latlng + '&key=' + APIkey;

      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(response => {
        responseCountryName = response.results[0].address_components[0].short_name.toUpperCase();
        // convert our users typed country to the iso code we use later in our api call to musixmatch
        $('#user-input').val(countryConvert);
        $('#user-input').attr("data-country", response.results[0].address_components[0].short_name);
        startCountryConvert();
      });
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }

  $('#submit').on('click', () => {    
    debugger;
    let currentInputVal = $('#user-input').val();
    let countryCapitalized = capitalizeCountry(currentInputVal);
    // convert our users typed country to the iso code we use later in our api call to musixmatch
    $('#user-input').val(countryCapitalized);
    $('#user-input').attr("data-country", );
    $('body').append(makeRequest);
  });

  $('#get-location').on('click', () => {
    inputPosition();
  });
});