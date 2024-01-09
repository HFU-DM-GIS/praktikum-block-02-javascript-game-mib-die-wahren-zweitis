let buttonId = ["AnswerA", "AnswerB", "AnswerC", "AnswerD"];
var cityIndex = 0;
let cityIndicies = []; // Mehrzahl von Index ist Indices
let cityAnswerOptn = []; // Option ist nicht so lang, Optn könnte auch für Optimization stehen
let url = "https://www.openstreetmap.org/export/embed.html?bbox=-10.612792968750002%2C44.69989765840321%2C26.03759765625%2C57.124314084296216&amp;layer=mapnik"
let GameTimeInSeconds; 
const buttonA = {

  identity: "AnswerA",

  NameOfCity: "None",

  longitude: 0,

  latitude: 0,

};

const buttonB = {

  identity: "AnswerB",

  NameOfCity: "None",

  longitude: 0,

  latitude: 0,

};

const buttonC = {

  identity: "AnswerC",

  NameOfCity: "None",

  longitude: 0,

  latitude: 0,

};

const buttonD = {

  identity: "AnswerD",

  NameOfCity: "None",

  longitude: 0,

  latitude: 0,

};

let buttonObj = [buttonA, buttonB, buttonC, buttonD];

//Code testing / debugging. TODO: Delete later. 
console.log(buttonA.identity, typeof (buttonA.identity));


function getRandomCityName(buttonId) {
  // hier passt der Name nicht so ganz... der Prefix get impliziert, dass etwas zurück gegeben wird und sonst nichts passiert (getter+setter, https://de.wikipedia.org/wiki/Zugriffsfunktion)... in eurem Fall werden aber einige globale Variablen verändert. Dadurch bewirkt der mehrfache Aufruf dieser Funktion immer etwas anderes.

  let randomCity = cities[cityIndicies[cityIndex]];
  cityIndex++;

  cityAnswerOptn.push(randomCity);

  for (let i = 0; i < buttonObj.length; i++) {

    if (buttonId == buttonObj[i].identity) {

      buttonObj[i].NameOfCity = randomCity.name;
      buttonObj[i].latitude = randomCity.lat;
      buttonObj[i].longitude = randomCity.lng;

    }
  }
  console.log(buttonObj);

  return randomCity.name;
}

function displayRandomCityButton(buttonId) {

  let cityName = getRandomCityName(buttonId);
  document.getElementById(buttonId).innerText = "Antwort " + buttonId.charAt(buttonId.length - 1) + ": " + cityName;
}

function initRandomCityList() {

  //Get number of cities in list
  let numCitys = cities.length;
  //Generate array of city indices
  cityIndicies = Array.from(Array(numCitys).keys());
  //Shuffle indicies 
  shuffle(cityIndicies);

}
//Copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

//Problem? Map is displayed in local language. 
function setMapToAnswer() {

  // show map of one of the cities
  // random choice of four cities
  let correctCityIndex = 0;
  // get coordinates (bbox) of this city
  let lonOfCity = Number(cityAnswerOptn[correctCityIndex].lng);
  let latOfCity = Number(cityAnswerOptn[correctCityIndex].lat);

  console.log(lonOfCity, latOfCity);
  //let lonOfCity = cities[0].lng;
  //let latOfCity = cities[0].lat;

  let mapSizeInGPS = 0.001; // nicht ganz präzise, da es die halbe Kartengröße ist
  let minLon = lonOfCity - mapSizeInGPS;
  let maxLon = lonOfCity + mapSizeInGPS;
  let minLat = latOfCity - mapSizeInGPS;
  let maxLat = latOfCity + mapSizeInGPS;

  let bbox = [minLon, minLat, maxLon, maxLat];
  console.log(bbox)
  // change html code to display the city
  let gameMap = document.getElementById("GameMap");
  console.log(gameMap.getAttribute('src'));
  let mapLink = 'https://www.openstreetmap.org/export/embed.html?bbox=' + bbox[0] + '%2C' + bbox[1] + '%2C' + bbox[2] + '%2C' + bbox[3] + '&layer=mapnik'
  gameMap.setAttribute('src', mapLink);

}

function checkButtonsForRightAnswer(buttonId) {
  // Get the clicked button object based on the buttonId
  let clickedButton = buttonObj.find(button => button.identity === buttonId);

  // Get the correct answer's name
  let correctAnswerName = cityAnswerOptn[0].name;

  // Check if the clicked button's NameOfCity is the correct answer's name
  if (clickedButton.NameOfCity === correctAnswerName) {
    // Redirect to right_screen.html
    window.location.href = "right_screen.html";
  } else {
    // Redirect to wrong_screen.html or handle the incorrect answer logic
    window.location.href = "wrong_screen.html";
  }
}

function clearLocalStorage() {

  localStorage.clear();
  window.location.reload();

}

//following a tutorial from https://www.freecodecamp.org/news/how-to-create-a-countdown-timer/
function startCountdownTillGameOver(GameTimeInSeconds) {
  let counter; 

  if(GameTimeInSeconds) {
     counter = GameTimeInSeconds;

  } else {
    counter = 60; 

  }

  const interval = setInterval(() => {
    document.getElementById("CountDown").innerText = "Verbleibende Zeit: " + counter; 
    counter--; 

    if(counter < 0) {
      clearInterval(interval); 
      window.location.href = "timeOver_screen.html"; 
  
    }

  }, 1000); 
}

function changeGameSettings() { 

  let newGameTime; 
  let newMapSectionSize; 
  let newMapOffsetNorthOrSouth;
  let newMapOffsetWestOrEast; 

  document.getElementById()
  

}
/*wir nehmen die ausgewählten indicies und stecken diese in einem tempöreren Array rein und 
ziehen davon eine zahl raus und das ist die korrekte antwort*/
// Kommentare auf Englisch und Rechtschreibung beachten
initRandomCityList(); // präziser wäre initRandomCityIndexList...

// hier besser dafür sorgen, dass die Buttons in einer Funktion initialisiert werden, im Idealfall eine Schleife von 1 bis numAnswers.
displayRandomCityButton("AnswerA");
displayRandomCityButton("AnswerB");
displayRandomCityButton("AnswerC");
displayRandomCityButton("AnswerD");

//Shuffles the array that contains all answer options. 
shuffle(cityAnswerOptn);

//Only used for debugging. TODO: delete later.
console.log(cityAnswerOptn[0].lng + " " + cityAnswerOptn[0].lat + " " + cityAnswerOptn[0].name);

//Displays the correct part of the map. 
setMapToAnswer();

//Code testing / debugging. TODO: Delete later.
console.log(cityAnswerOptn);

document.getElementById("clearStorage").onclick = function () { clearLocalStorage() };

startCountdownTillGameOver();






