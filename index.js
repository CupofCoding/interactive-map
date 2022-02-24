// What events will your application need?
// What APIs will you need and in what order?
// How will you obtain the user's location?
// How will you add the user's location to the map?
// How will you get the selected location from the user?
// How will you add that information to the map?

//create a select interface:  coffee, restaurant, hotel, and market. 

//create a space where you will place your map.

//sorting function based on criteria
//parking/transportation; uber stops, public transportation

//build leaflet map

const map = L.map('map');

    // Add OpenStreetMap tiles:
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(map);

    function onLocationFound(e) {
        //circle marker
        let radius = e.accuracy / 2;

        //notification 
        L.marker(e.latlng).addTo(map)
            .bindPopup("You are here.").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    //error message
    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({setView: true, maxZoom: 16});


    // create and main add geolocation marker (Default location if location not allowed.)
    const marker = L.marker([33.88247227728787, -117.88513548861016])
    marker.addTo(map).bindPopup('<p1><b>Start Here: California State University, Fullerton</b></p1>').openPopup()


    
    // draw the 2nd arrondissement
    let latlngs = [
        [33.87478124282599, -117.8834178964772], //Pieology
        [33.872752059808775, -117.88986435792881], //Mr BBQ
        [33.76100773284257, -117.83768246830293], //Shabu Shabu Bar
        [33.75906455195339, -117.82671753946761], //Belacan Grill - Malaysian Bistro
        [33.70776121390728, -117.8360862163415], //Din Tai Fung
        [33.65297186936441, -117.7386328377369], //Wood Ranch
    ];
    
    let polygon = L.polyline(latlngs, {color: 'green'}).addTo(map);   
    
    // zoom the map to the polygon
    map.fitBounds(polygon.getBounds());

// restaurant recommendation markers
/*const pizza = L.marker([33.87478124282599, -117.8834178964772],{icon: redPin}).bindPopup('Pieology')
const kbbq = L.marker([33.872752059808775, -117.88986435792881],{icon: redPin}).bindPopup('Mr BBQ')
const shabu = L.marker([33.76100773284257, -117.83768246830293],{icon: redPin}).bindPopup('Shabu Shabu Bar')
const malay = L.marker([33.75906455195339, -117.82671753946761],{icon: redPin}).bindPopup('Belacan Grill - Malaysian Bistro')
const dumpling = L.marker(33.70776121390728, -117.8360862163415],{icon: redPin}).bindPopup('Din Tai Fung')
const bbq = L.marker([33.65297186936441, -117.7386328377369]).bindPopup('Wood Ranch')

const restaurant = L.layerGroup([pizza, kbbq, shabu, malay, dumpling, bbq]).addTo(map)

const userMap = {
    //Grab user location
   userPosition: [],
   userLocalMap:  {},
   userMarker: {},
   locations: [],
   locationMarkers: {},

   initializeMap() {
       this.userLocalMap = L.map('map', {center: this.userPosition, zoom: 11,});
   
       // Add OpenStreetMap tiles:
       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
           minZoom: '10',
       }).addTo(this.userLocalMap)
   
       //Add user location marker
       const marker = L.marker(this.userPosition)
       marker.addTo(this.userLocalMap).bindPopup('<p1><b>Your are here</b></p1>').openPopup()
   },

   addBusinesLocations(){
       this.locations.forEach((location) => {
           userMap.locationMarkers = L.marker([location.lat, location.long])
           userMap.locationMarkers.addTo(userMap.userLocalMap).bindPopup(`<p1><b>${location.name}</b></p1>`).openPopup()
       })
   },


}

//Wait for page load
window.onload = async () => {
    let coords = await getUserPosition()
    userMap.userPosition = coords
    userMap.initializeMap()
}

//Fetch Foursquare data via API
async function getFoursquareData(category){
    const options = {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: 'fsq3eRAeSflBeplmnMkHnAdQqcQJS8bvOIGgJXchlCZjE6g='
        }
    }
    let lat = userMap.userPosition[0]
    let long = userMap.userPosition[1]

    
    let response = await fetch(`https://api.foursquare.com/v3/places/search?ll=${lat}%2C${long}&radius=3000&query=${category}&limit=5`, options)
    let data = await response.json()
    let localBusinesses = data.results

    return localBusinesses
}


let locationButtons = document.querySelectorAll(".locationButton")
locationButtons.forEach((location) => { 
    location.addEventListener('click', async () => {
        let category = location.textContent;
        let selectionData = await getFoursquareData(category)
        
        selectionData.forEach((location) => {
            userMap.locations.push({name: location.name, lat: location.geocodes.main.latitude, long: location.geocodes.main.longitude})
        })
        userMap.addBusinesLocations()
 
    })
})
*/