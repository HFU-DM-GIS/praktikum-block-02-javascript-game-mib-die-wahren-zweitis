let buttonId = ["AnswerA", "AnswerB", "AnswerC", "AnswerD"];

function getRandomCityName() {

    let randomCity = cities[Math.floor(Math.random() * cities.length)];
    return randomCity.name; 
  }
  
  function displayRandomCityButton(buttonId) {

    let cityName = getRandomCityName();
    document.getElementById(buttonId).innerText = "Antwort " + buttonId.charAt(buttonId.length - 1) + ": " + cityName;
  }

  function getRandomButton() {

    let randomButton = buttonId[Math.floor(Math.random() * buttonId.length)]; 
    return randomButton; 
  }

displayRandomCityButton("AnswerA");
displayRandomCityButton("AnswerB");
displayRandomCityButton("AnswerC");
displayRandomCityButton("AnswerD");

let chosenOne = getRandomButton(); 
console.log(chosenOne);  






