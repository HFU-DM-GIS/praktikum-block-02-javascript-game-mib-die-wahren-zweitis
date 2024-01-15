let buttonId = ["AnswerA", "AnswerB", "AnswerC", "AnswerD"];
var cityIndex = 0;
let cityIndices = []; 
let cityAnswerOptions = []; 
let url = "https://www.openstreetmap.org/export/embed.html?bbox=-10.612792968750002%2C44.69989765840321%2C26.03759765625%2C57.124314084296216&amp;layer=mapnik"
let gameTimeInSeconds; 
let addendThatDictatesMapSector; 
let northSouthAdjustment;
let eastWestAdjustment; 
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

  let randomCity = cities[cityIndices[cityIndex]];
  cityIndex++;

  cityAnswerOptions.push(randomCity);

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
  cityIndices = Array.from(Array(numCitys).keys());
  //Shuffle indicies 
  shuffle(cityIndices);

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
  let lonOfCity = Number(cityAnswerOptions[correctCityIndex].lng);
  let latOfCity = Number(cityAnswerOptions[correctCityIndex].lat);

  console.log(lonOfCity, latOfCity);
  //let lonOfCity = cities[0].lng;
  //let latOfCity = cities[0].lat;
  if(!addendThatDictatesMapSector) {
    addendThatDictatesMapSector = 0.001;
  }

  if(!eastWestAdjustment) { 
    eastWestAdjustment = 0; 
  }

  if(!northSouthAdjustment) {
    northSouthAdjustment = 0; 
  }

  let minLon = lonOfCity - addendThatDictatesMapSector + eastWestAdjustment;
  let maxLon = lonOfCity + addendThatDictatesMapSector + eastWestAdjustment;
  let minLat = latOfCity - addendThatDictatesMapSector + northSouthAdjustment;
  let maxLat = latOfCity + addendThatDictatesMapSector + northSouthAdjustment;

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
  let correctAnswerName = cityAnswerOptions[0].name;

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

}

//following a tutorial from https://www.freecodecamp.org/news/how-to-create-a-countdown-timer/
function startCountdownTillGameOver() {
  let counter; 

  if(gameTimeInSeconds) {
     counter = gameTimeInSeconds;
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

function saveGameSettings() { 

  let newGameTime; 
  let newMapSectionSize; 
  let newMapOffsetNorthOrSouth;
  let newMapOffsetEastOrWest; 

  let timeSeletor = document.getElementById("timeInputByUser"); 
  newGameTime = timeSeletor.value; 
   

  let mapSelctor = document.getElementById("mapSectorInputByUser"); 
  newMapSectionSize = mapSelctor.value; 
  

  let northOrSouthValueSelector = document.getElementById("southNorthAdjustmentInputByUser");
  newMapOffsetNorthOrSouth = northOrSouthValueSelector.value; 
   
  
  let eastOrWestValueSelector = document.getElementById("eastWestAdjustmentInputByUser"); 
  newMapOffsetEastOrWest = eastOrWestValueSelector.value; 

  localStorage.setItem("userSettingTime", newGameTime);
  localStorage.setItem("userSettingMapSection", newMapSectionSize);
  localStorage.setItem("userSettingNorthSouthOffset", newMapOffsetNorthOrSouth);
  localStorage.setItem("userSettingEastWestOffset", newMapOffsetEastOrWest); 
   
}

function updateGameSettings() {

  try { 
    let getTime = localStorage.getItem("userSettingTime");
    gameTimeInSeconds = Number(getTime);  
  } catch {
    console.log("No time setting found."); 
  }

  try {
    let getMapSection = localStorage.getItem("userSettingMapSection"); 
    addendThatDictatesMapSector = Number(getMapSection); 
  } catch {
    console.log("No map section setting found.")
  }

  try { 
    let getNorthSouthOffset = localStorage.getItem("userSettingNorthSouthOffset");
    northSouthAdjustment = Number(getNorthSouthOffset); 
  } catch {
    console.log("No north or south adjustment found."); 
  }

  try {
    let getEastWestOffset = localStorage.getItem("userSettingEastWestOffset");
    eastWestAdjustment = Number(getEastWestOffset); 
  } catch {
    console.log("No east or west adjustment found."); 
  }
}

function setDefaultDropdownValues() {

  if (localStorage.getItem('userSettingTime')) {

    document.getElementById('timeInputByUser').value = localStorage.getItem('userSettingTime');
  }

  if (localStorage.getItem('userSettingMapSection')) {

    document.getElementById('mapSectorInputByUser').value = localStorage.getItem('userSettingMapSection');
  }

  if (localStorage.getItem('userSettingNorthSouthOffset')) {

    document.getElementById('southNorthAdjustmentInputByUser').value = localStorage.getItem('userSettingNorthSouthOffset');
  }

  if (localStorage.getItem('userSettingEastWestOffset')) {

    document.getElementById('eastWestAdjustmentInputByUser').value = localStorage.getItem('userSettingEastWestOffset');
  }
}

class leaderboardScore {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

function getScoreboardFromLocalStorage() {
  let scoreboardJSON = localStorage.getItem('scoreboard');
  return scoreboardJSON ? JSON.parse(scoreboardJSON) : [];
}

function updateScoreboard(newScore) {
  let scoreboard = getScoreboardFromLocalStorage();

  scoreboard.push(newScore);

  scoreboard.sort((a, b) => b.score - a.score);

  let topTenScores = scoreboard.slice(0, 10);

  localStorage.setItem('scoreboard', JSON.stringify(topTenScores));
}


updateGameSettings(); 
initRandomCityList(); // präziser wäre initRandomCityIndexList...

// hier besser dafür sorgen, dass die Buttons in einer Funktion initialisiert werden, im Idealfall eine Schleife von 1 bis numAnswers.
displayRandomCityButton("AnswerA");
displayRandomCityButton("AnswerB");
displayRandomCityButton("AnswerC");
displayRandomCityButton("AnswerD");

//Shuffles the array that contains all answer options. 
shuffle(cityAnswerOptions);

//Only used for debugging. TODO: delete later.
console.log(cityAnswerOptions[0].lng + " " + cityAnswerOptions[0].lat + " " + cityAnswerOptions[0].name);

//Displays the correct part of the map. 
setMapToAnswer();
 
startCountdownTillGameOver();






