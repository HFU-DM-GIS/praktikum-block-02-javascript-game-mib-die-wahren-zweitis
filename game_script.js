function getRandomCityName() {

    var randomCity = cities[Math.floor(Math.random() * cities.length)];
    return randomCity.name; 
  }
  
  function displayRandomCityButton(buttonId) {
    var cityName = getRandomCityName();
    document.getElementById(buttonId).innerText = "Antwort " + buttonId.charAt(buttonId.length - 1) + ": " + cityName;
  }

displayRandomCityButton("AnswerA");
displayRandomCityButton("AnswerB");
displayRandomCityButton("AnswerC");
displayRandomCityButton("AnswerD");