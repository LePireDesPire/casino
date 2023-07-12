// Variables globales
var selectedNumbers = [];

// Fonction pour sélectionner/désélectionner un numéro
function toggleNumber(number) {
  var numberElement = document.getElementById("number-" + number);

  if (selectedNumbers.includes(number)) {
    // Désélectionner le numéro
    selectedNumbers = selectedNumbers.filter(function(num) {
      return num !== number;
    });
    numberElement.classList.remove("selected");
  } else {
    if (selectedNumbers.length < 5) {
      // Sélectionner le numéro
      selectedNumbers.push(number);
      numberElement.classList.add("selected");
    }
  }

  updatePlayButtonState();
}

// Fonction pour activer la mise en surbrillance des boutons sélectionnés au survol
function enableHoverHighlight() {
  var numberElements = document.getElementsByClassName("keno-number");
  for (var i = 0; i < numberElements.length; i++) {
    numberElements[i].addEventListener("mouseenter", function() {
      if (!this.classList.contains("selected")) {
        this.classList.add("hover-highlight");
      }
    });
    numberElements[i].addEventListener("mouseleave", function() {
      this.classList.remove("hover-highlight");
    });
  }
}

// Fonction pour mettre à jour l'état du bouton de jeu
function updatePlayButtonState() {
  var playButton = document.getElementById("play-button");
  playButton.disabled = selectedNumbers.length !== 5;
}

// Fonction pour jouer
function play() {
  if (selectedNumbers.length < 5) {
    alert("Veuillez sélectionner 5 numéros avant de jouer !");
    return;
  }

  // Autre logique de jeu ici...

  console.log("Numéros sélectionnés :", selectedNumbers);
}

// Ajouter des écouteurs d'événements aux numéros
var numberElements = document.getElementsByClassName("keno-number");
for (var i = 0; i < numberElements.length; i++) {
  var number = parseInt(numberElements[i].textContent);
  numberElements[i].addEventListener("click", function() {
    toggleNumber(number);
  });
}

// Ajouter un écouteur d'événement au bouton de jeu
var playButton = document.getElementById("play-button");
playButton.addEventListener("click", play);

// Activer la mise en surbrillance des boutons sélectionnés au survol
enableHoverHighlight();

// Appel initial pour mettre à jour l'état du bouton de jeu
updatePlayButtonState();
