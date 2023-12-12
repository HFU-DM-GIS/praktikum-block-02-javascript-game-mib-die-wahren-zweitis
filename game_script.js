let buttonId = ["AnswerA", "AnswerB", "AnswerC", "AnswerD"];
var cityIndex = 0;
let cityIndicies = [];
let cityAnswerOptn = [];
let url = "https://www.openstreetmap.org/export/embed.html?bbox=-10.612792968750002%2C44.69989765840321%2C26.03759765625%2C57.124314084296216&amp;layer=mapnik"

const buttonA = {

  identity : "AnswerA",

  NameOfCity : "None",

  longitude : 0,

  latitude : 0, 

};

const buttonB = {

  identity : "AnswerB",

  NameOfCity : "None",

  longitude : 0,

  latitude : 0, 

};

const buttonC = {

  identity : "AnswerC",

  NameOfCity : "None",

  longitude : 0,

  latitude : 0, 

};

const buttonD = {

  identity : "AnswerD",

  NameOfCity : "None",

  longitude : 0,

  latitude : 0, 

};

let buttonObj =[buttonA, buttonB, buttonC, buttonD]; 

//Code testing / debugging. TODO: Delete later. 
console.log(buttonA.identity, typeof(buttonA.identity));


function getRandomCityName(buttonId) {

  let randomCity = cities[cityIndicies[cityIndex]];
  cityIndex++;

  cityAnswerOptn.push(randomCity);

  for(let i = 0; i < buttonObj.length; i ++){

    if(buttonId == buttonObj[i].identity){

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

/*wir nehmen die ausgewählten indicies und stecken diese in einem tempöreren Array rein und 
ziehen davon eine zahl raus und das ist die korrekte antwort*/
initRandomCityList();

displayRandomCityButton("AnswerA");
displayRandomCityButton("AnswerB");
displayRandomCityButton("AnswerC");
displayRandomCityButton("AnswerD");

//Shuffles the array that contains all answer options. 
shuffle(cityAnswerOptn);

//Only used for debugging. TODO: delete later.
document.getElementById("RightAnswer").innerText = cityAnswerOptn[0].lng + " " + cityAnswerOptn[0].lat + " " + cityAnswerOptn[0].name;

//Displays the correct part of the map. 
setMapToAnswer();

//Code testing / debugging. TODO: Delete later.
console.log(cityAnswerOptn); 

checkButtonsForRightAnswer(); 

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

  let mapSizeInGPS = 0.001;
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

//Sets all button links to wrong. Usefull to rest game.  
function setLinksToWrongPage() {

  for (let i = 0; i < buttonId.length; i++) {

    let wrongURL = "wrong_screen.html";
    document.getElementById(buttonId[i]).href = wrongURL;

  }

}

function setLinkToRightPage(buttonId) {

  let rightURl = "right_screen.html"; 
  document.getElementById(buttonId).href = rightURl; 

  }

  function checkButtonsForRightAnswer(){

    for(let i = 0; i < buttonObj.length; i++){

      console.log(buttonObj[i], typeof(buttonObj[i]), cityAnswerOptn[0], typeof(cityAnswerOptn[0])); 

      if(buttonObj[i].NameOfCity == cityAnswerOptn[0].name){

        setLinkToRightPage(buttonObj[i].identity)

      }
    }
  }

  function updateScore(){

    console.log("Hey");

  }

  function clearLocalStorage(){

    localStorage.clear(); 

  }

  document.getElementById("clearStorage").onclick = function() { clearLocalStorage()}; 
 

 


/* This is pseudo-code only used to remember tasks:
(1. Write funtion to count the score. Needs a score box as HTML first.)
2. Button funktion einfügen bei den Antworten, sodass richtig und falsch angezeigt wird und damit man zum nächstenm level kommt
4. städte sollen sich nicht direkt wiederholen
*/
