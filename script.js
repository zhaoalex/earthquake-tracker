$(document).foundation();

var mymap;

let initMap = () => {
  mymap = L.map('map').setView([0, 0], 1);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWxleHpoYW8iLCJhIjoiY2o5bHRyZThmMXl1cTJ3cGdyZzA4Ymk2MSJ9.5D6chKJs9KgHH5GLXqfN5g'
  }).addTo(mymap);
}

let updateQuakes = () => {
  let jsonData = fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson')
    .then(res => res.json())
    .then(json => parseData(json))

}

let parseData = (data) => {
  let earthquakes = data.features
  var list = document.getElementsByClassName("quakeList")
  earthquakes.forEach(quake => {
    console.log(quake.properties.title)
    list[0].innerHTML += ("<li>" + quake.properties.title + "</li>")
    L.marker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]])
      .bindPopup(quake.properties.title)
      .openPopup()
      .addTo(mymap)
  })
}

let refresh = () => {
  document.getElementsByClassName("quakeList")[0].innerHTML = ""

  mymap.remove()

  initMap()
  updateQuakes()
  console.log("Refreshed page")
}

initMap()
updateQuakes()

/*Promise.all([jsonData])
  .then(resArr => resArr[0].json())
  .then(res => console.log(res))
*/

//let jsonMoreData = fetch()
//Promise.all([jsonData, jsonMoreData]).then(resArr => resArr[0])

/*var jsonData = fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson').then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  });
});
*/
