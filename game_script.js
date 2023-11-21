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

/*let chosenOne = getRandomButton(); 
console.log(chosenOne);'*/   

/* This is pseudo-code only used to remember tasks:
1. Write funtion to count the score. Needs a score box as HTML first.

*/ 
