

var x = document.getElementById("demo");

const app = document.getElementById('root')


const container = document.createElement('div')
container.setAttribute('class', 'container2')

app.appendChild(container)

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {


    var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var request = {
        location: currentLocation,
        radius: 500,
        type: ['restaurant']
    };

    var service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, callback);
}

function callback(results, status) {

    const app = document.getElementById('root')

    const container = document.createElement('div')
    container.setAttribute('class', 'wrapper')
    container.setAttribute('style', 'margin:20px')

    app.appendChild(container)

    if (status == google.maps.places.PlacesServiceStatus.OK) {

        var data = results;

        console.log(data);

        data.forEach(place => {
            
            const card = document.createElement('div')
            card.setAttribute('class', 'card')
            card.setAttribute('style', 'margin: 10px')

            const cardheader = document.createElement('div')
            cardheader.setAttribute('class', 'card-header')
            cardheader.textContent = place.name
            // const placeImage = place.photos.getUrl({maxWidth: 100, maxHeight: 100})
            // document.getElementById('div').src = placeImage

            const cardmain = document.createElement('div')
            cardmain.setAttribute('class', 'card-main')

            const carddescription = document.createElement('div')
            carddescription.setAttribute('class', 'card-description')

            container.appendChild(card)
            card.appendChild(cardheader)
            card.appendChild(cardmain)
            cardmain.appendChild(carddescription)

        });



    }
}

getLocation();