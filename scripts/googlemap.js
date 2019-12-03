//unused

let map = null;

function initMap() {
    let location = new Object();
    navigator.geolocation.getCurrentPosition(function (pos) {
        location.lat = pos.coords.latitude;
        location.long = pos.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: location.lat, lng: location.long },
            zoom: 15
        });
        populateRestaurants(location);
    });

}

function populateRestaurants(location) {
    var found = new google.maps.LatLong(location.lat, location.long);
    var request = {
        location: found,
        radius: '1500',
        type: ['restaurant']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            let price = createPrice(place.price_level);
            let content = '<h3>${place.name}</h3> <h4>${place.vicinity}</h4><p>Price: ${price}</p> <p>Rating: ${place.rating}</p>';

            var marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.namel
            });

            var infodialog = new google.maps.InfoWindow({
                content: content
            });

            bindInfoWindow(marker, map, infodialog, content);
            marker.setMap(map);
        }
    }
}

function bindInfoWindow(marker, map, infodialog, html) {
    marker.addListener('click', function () {
        infodialog.setContent(html);
        infodialog.open(map, this);
    });
}

function createPrice(level) {
    if (level != "" && level != null) {
        let out = "";
        for (var i = 0; x < level; x++) {
            out += '$';
        }
        return out;
    } else {
        return "?";
    }
}