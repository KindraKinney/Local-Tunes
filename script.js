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
      console.log(response.album.image[4]['#text']);
      const art = response.album.image[4]['#text'];
      const topPicks = `
        <img src='${art}' alt='album art for this album' />
        <div class='mdc-typography--headline6'>Title: ${currentTrack}</div>
        <div class='mdc-typography--subtitle1'>Artist: ${currentArtist}</div>
        <br>
      `

      $('#output-box').append(topPicks);
    });
  }
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
        $('#user-input').val(response.results[0].address_components[0].short_name);
      });
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }

  $('#submit').on('click', () => {
    const countryCode = $('#user-input').val();
    const makeRequest = $('<script>').attr('src', `https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=jsonp&callback=response&country=${countryCode}&apikey=744d96e601e068c973cbbc1a33372ce4`);
    $('body').append(makeRequest);
  });

  $('#get-location').on('click', () => {
    inputPosition();
  });
});