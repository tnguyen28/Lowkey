

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
        types: ['restaurant'],
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
        console.log(data)

        data.forEach(place => {

            const card = document.createElement('div')
            card.setAttribute('class', 'card')
            card.setAttribute('style', 'margin: 10px')

            const cardheader = document.createElement('div')
            cardheader.setAttribute('class', 'card-header')

            const cardImage = document.createElement('img')
            cardImage.setAttribute('class', 'img')
            cardImage.setAttribute('src', place.photos[0].getUrl({ 'maxWidth': 250, 'maxHeight': 250 }))
            cardImage.setAttribute('style', 'width: 290px; height:180px')
            cardheader.appendChild(cardImage)

            const cardmain = document.createElement('div')
            cardmain.setAttribute('class', 'card-main')

            var description = place.name + ' (' + place.rating + '/5*)'

            const carddescription = document.createElement('div')
            carddescription.setAttribute('class', 'main-description')

            const cardd1 = document.createElement('p')
            cardd1.textContent = description

            const cardd2 = document.createElement('p')
            cardd2.setAttribute('style', 'font-size: 14px')
            cardd2.textContent = place.vicinity

            const cardd3 = document.createElement('div')
            cardd3.setAttribute('style', 'text-align: center;')
            if (place.opening_hours.open_now === true) {
                cardd3.setAttribute('class', 'open')
                cardd3.textContent = 'OPEN'
            } else if (place.opening_hours.open_now === false) {
                cardd3.setAttribute('class', 'closed')
                cardd3.textContent = 'CLOSED'
            } else if (place.opening_hours.open_now === undefined) {
                console.log('cannot find if open')
            }

            carddescription.appendChild(cardd1)
            carddescription.appendChild(cardd2)

            container.appendChild(card)
            card.appendChild(cardheader)
            cardheader.appendChild(cardd3)
            card.appendChild(cardmain)
            cardmain.appendChild(carddescription)

        });
    }
}

getLocation();