// Hier greifen wir auf das HTML-Element mit der ID "startButton" zu
var startButton = document.getElementById("startButton");

// Hier fügen wir einen Eventlistener hinzu, um auf Klick-Ereignisse zu reagieren
startButton.addEventListener("click", function() {
    window.location.href = "spiel.html";
})