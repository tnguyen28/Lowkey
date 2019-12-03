

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
        type: ['restaurant'],
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
        // var filteredData = []
        // data.forEach(place => {
        //     if(place.reviews.length > 0){
        //         //nohtign
        //     } else {
        //         return
        //     }
        //     filteredData.push(place)
        // })

        data.forEach(place => {

            const card = document.createElement('div')
            card.setAttribute('class', 'card')
            card.setAttribute('style', 'margin: 10px')

            const cardheader = document.createElement('div')
            cardheader.setAttribute('class', 'card-header')

            var photos = place.photos

            const image = (photos != undefined) ? ('background-image: url("' + photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) + '")') : ''
            const cardImage = document.createElement('img')
            cardImage.setAttribute('class', 'img')
            cardImage.setAttribute('style', image)
            cardheader.appendChild(cardImage)

            const cardmain = document.createElement('div')
            cardmain.setAttribute('class', 'card-main')

            var description = place.name + ' (' + place.rating + '/5*)'

            const carddescription = document.createElement('div')
            carddescription.setAttribute('class', 'main-description')

            const cardd1 = document.createElement('p')
            cardd1.textContent = description

            const cardd2 = document.createElement('p')
            cardd2.textContent = place.vicinity

            const cardd3 = document.createElement('div')

            if(place.opening_hours.open_now == true){
                cardd3.setAttribute('class', 'open')
                cardd3.setAttribute('style', 'color: white; ')
                cardd3.textContent = 'OPEN'
            } else {
                cardd3.setAttribute('class', 'closed')
                cardd3.textContent = 'CLOSED'
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