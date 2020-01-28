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
  return countryNames[capitalizeCountry(country)];
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
        $('#user-input').val(response.results[0].address_components[0].long_name);
      });
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }

  $('#submit').on('click', () => {
    const currentInputVal = $('#user-input').val();
    $('#user-input').val('');
    const countryCode = countryToIso(currentInputVal);
    const makeRequest = $('<script>').attr('src', `https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=jsonp&callback=response&page_size=9&country=${countryCode}&apikey=744d96e601e068c973cbbc1a33372ce4`);
    $('body').append(makeRequest);
  });

  $('#get-location').on('click', () => {
    inputPosition();
  });
});