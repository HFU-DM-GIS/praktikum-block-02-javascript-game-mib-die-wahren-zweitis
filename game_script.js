let buttonId = ["AnswerA", "AnswerB", "AnswerC", "AnswerD"];
var cityIndex = 0; 
let cityIndicies = []; 

/*Use these to change BBox. TODO: Write funktion that changes src of slippy map. Standard format: bbox = left,bottom,right,top
                                                                                                  bbox = min Longitude , min Latitude , max Longitude , max Latitude */
let bBoxLeft
let bBoxBottom
let bBoxRight
let bBoxTop

//Modify this to also return lat, lng of the city. These are needed to direct slippy map to correct tile. Also change so no citys can be displayed twice.  
function getRandomCityName() {

    let randomCity = cities[cityIndicies[cityIndex]];
    cityIndex++; 
    return randomCity.name; 
  }
  
function displayRandomCityButton(buttonId) {

  let cityName = getRandomCityName();
  document.getElementById(buttonId).innerText = "Antwort " + buttonId.charAt(buttonId.length - 1) + ": " + cityName;
}

function initRandomCityList(){

  //Get number of cities in list
  let numCitys = cities.length; 
  //Generate array of city indices
  cityIndicies = Array.from(Array(numCitys).keys()); 
  //Shuffle indicies 
  shuffle(cityIndicies); 
  
}
//Copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

  //This is supposed to designate one button as the right answer. Works as it should. 
  /*function getRandomButton() {

    let randomButton = buttonId[Math.floor(Math.random() * buttonId.length)]; 
    return randomButton; 
  } */
initRandomCityList(); 

displayRandomCityButton("AnswerA");
displayRandomCityButton("AnswerB");
displayRandomCityButton("AnswerC");
displayRandomCityButton("AnswerD");

// show map of one of the cities
  // random choice of four cities
  let correctCityIndex = 0; 
  // get coordinates (bbox) of this city
  let lonOfCity = cities[cityIndicies[correctCityIndex]].lng;
  let latOfCity = cities[cityIndicies[correctCityIndex]].lat;
  let mapSizeInGPS = 0.1;
  let minLon = lonOfCity - mapSizeInGPS;
  let maxLon = lonOfCity + mapSizeInGPS;
  let minLat = latOfCity - mapSizeInGPS;
  let maxLat = latOfCity + mapSizeInGPS;

  let bbox = [minLon, minLat, maxLon, maxLat];
  console.log(bbox)
  // change html code to display the city
  let gameMap = document.getElementById("GameMap");
  console.log(gameMap.getAttribute('src'));
  let mapLink = 'https://www.openstreetmap.org/export/embed.html?bbox=' + bbox[0]+ '%2C' + bbox[1] + '%2C26.03759765625%2C57.124314084296216&layer=mapnik'
  gameMap.setAttribute('src', mapLink);

/*let chosenOne = getRandomButton(); 
console.log(chosenOne);'*/   

/* This is pseudo-code only used to remember tasks:
1. Write funtion to count the score. Needs a score box as HTML first.

*/ 
