$(document).ready(() => {
  const inputPosition = () => {
    let startPos;
    const geoSuccess = position => {
      startPos = position;
      const latlng = startPos.coords.latitude + ',' + startPos.coords.longitude;
      const APIkey = 'AIzaSyDrCceye243-Te4hjHSsc7h3LcwzY-1xeI';
      const queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=' + APIkey;

      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(response => {
        $("#output-box").append(response.results[10].address_components[0].long_name);
      });
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };
  }

  const response = musicData => {
    $('#output-box').empty();
    data = musicData;
    const numOfTracks = data.message.body.track_list.length;
    for (let i = 0; i < numOfTracks; i++) {
      let currentTrack = data.message.body.track_list[i].track.track_name;
      let currentArtist = data.message.body.track_list[i].track.artist_name;
      let topPicks = `
        <div class="mdc-typography--headline6">Title: ${currentTrack}</div>
        <div class="mdc-typography--subtitle1">Artist: ${currentArtist}</div>
        <br>`
      $("#output-box").append(topPicks);
    }
  }

  $('#submit').on('click', () => {
    const countryCode = $('#user-input').val();
    const makeRequest = $('<script>').attr('src', `https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=jsonp&callback=response&country=${countryCode}&apikey=744d96e601e068c973cbbc1a33372ce4`);
    $('body').append(makeRequest);
  });

  inputPosition();
});