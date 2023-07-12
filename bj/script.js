// Variables globales
var deck = [];
var dealerHand = [];
var playerHand = [];

// Création du jeu de cartes
function createDeck() {
    var suits = ['♠', '♥', '♦', '♣'];
    var values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < values.length; j++) {
            var card = {
                suit: suits[i],
                value: values[j]
            };
            deck.push(card);
        }
    }
}

// Mélange des cartes
function shuffleDeck() {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Distribution des cartes initiales
function dealInitialCards() {
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());

    displayHands();
    checkBlackjack();
}

// Affichage des mains
function displayHands() {
    var dealerHtml = 'Dealer (' + getHandValue(dealerHand) + '):';
    var playerHtml = 'Player (' + getHandValue(playerHand) + '):';

    document.getElementById('dealer').innerHTML = dealerHtml;
    document.getElementById('player').innerHTML = playerHtml;

    document.getElementById('dealer-hand').innerHTML = getHandHtml(dealerHand);
    document.getElementById('player-hand').innerHTML = getHandHtml(playerHand);
}

// Obtenir le HTML pour une main de cartes
function getHandHtml(hand) {
    var handHtml = '';

    for (var i = 0; i < hand.length; i++) {
        handHtml += '<div class="card">' + hand[i].value + ' ' + hand[i].suit + '</div>';
    }

    return handHtml;
}

// Vérifier si l'une des mains a un blackjack
function checkBlackjack() {
    if (getHandValue(playerHand) === 21) {
        endGame("Player wins with a blackjack!");
    } else if (getHandValue(dealerHand) === 21) {
        endGame("Dealer wins with a blackjack!");
    }
}

// Obtenir la valeur d'une main de cartes
function getHandValue(hand) {
    var value = 0;
    var hasAce = false;

    for (var i = 0; i < hand.length; i++) {
        var cardValue = hand[i].value;

        if (cardValue === 'A') {
            value += 11;
            hasAce = true;
        } else if (cardValue === 'K' || cardValue === 'Q' || cardValue === 'J') {
            value += 10;
        } else {
            value += parseInt(cardValue);
        }
    }

    if (hasAce && value > 21) {
        value -= 10;
    }

    return value;
}

// Action lorsqu'un joueur tire une carte
function hit() {
    playerHand.push(deck.pop());
    displayHands();

    var playerValue = getHandValue(playerHand);
    if (playerValue > 21) {
        endGame("Player busts! Dealer wins.");
    }
}

// Action lorsque le joueur s'arrête
function stand() {
    while (getHandValue(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }

    displayHands();

    var dealerValue = getHandValue(dealerHand);
    var playerValue = getHandValue(playerHand);

    if (dealerValue > 21) {
        endGame("Dealer busts! Player wins.");
    } else if (dealerValue === playerValue) {
        endGame("Push! It's a tie.");
    } else if (dealerValue > playerValue) {
        endGame("Dealer wins.");
    } else {
        endGame("Player wins.");
    }
}

// Réinitialisation de la partie
function resetGame() {
    // Réinitialisation des variables
    deck = [];
    dealerHand = [];
    playerHand = [];

    // Réinitialisation du contenu HTML
    document.getElementById('dealer').innerHTML = 'Dealer:';
    document.getElementById('player').innerHTML = 'Player:';
    document.getElementById('dealer-hand').innerHTML = '';
    document.getElementById('player-hand').innerHTML = '';
    document.getElementById('result').innerHTML = '';

    // Réactivation des boutons
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;

    // Démarrage d'une nouvelle partie
    startGame();
}

// Fin du jeu
function endGame(message) {
    document.getElementById('result').innerHTML = message;
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
}

// Initialisation du jeu
function startGame() {
    createDeck();
    shuffleDeck();
    dealInitialCards();

    // Ajouter des écouteurs d'événements pour les boutons
    document.getElementById('hit-button').addEventListener('click', hit);
    document.getElementById('stand-button').addEventListener('click', stand);
    document.getElementById('reset-button').addEventListener('click', resetGame);
}

// Démarrer le jeu lors du chargement de la page
window.onload = startGame;