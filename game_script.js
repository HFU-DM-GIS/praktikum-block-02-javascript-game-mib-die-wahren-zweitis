let buttonId = ["AnswerA", "AnswerB", "AnswerC", "AnswerD"];

/*Use these to change BBox. TODO: Write funktion that changes src of slippy map. Standard format: bbox = left,bottom,right,top
                                                                                                  bbox = min Longitude , min Latitude , max Longitude , max Latitude */
let bBoxLeft
let bBoxBottom
let bBoxRight
let bBoxTop

//Modify this to also return lat, lng of the city. These are needed to direct slippy map to correct tile. 
function getRandomCityName() {

    let randomCity = cities[Math.floor(Math.random() * cities.length)];
    return randomCity.name; 
  }
  
  function displayRandomCityButton(buttonId) {

    let cityName = getRandomCityName();
    document.getElementById(buttonId).innerText = "Antwort " + buttonId.charAt(buttonId.length - 1) + ": " + cityName;
  }

  //This is supposed to designate one button as the right answer. Works as it should. 
  /*function getRandomButton() {

    let randomButton = buttonId[Math.floor(Math.random() * buttonId.length)]; 
    return randomButton; 
  } */

displayRandomCityButton("AnswerA");
displayRandomCityButton("AnswerB");
displayRandomCityButton("AnswerC");
displayRandomCityButton("AnswerD");

/*let chosenOne = getRandomButton(); 
console.log(chosenOne);'*/   

/* This is pseudo-code only used to remember tasks:
1. Write funtion to count the score. Needs a score box as HTML first.
*/ 
