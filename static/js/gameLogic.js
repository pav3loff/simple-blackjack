const numberToCardDict = {
  1: "ace-hearts",
  2: "two-hearts",
  3: "three-hearts",
  4: "four-hearts",
  5: "five-hearts",
  6: "six-hearts",
  7: "seven-hearts",
  8: "eight-hearts",
  9: "nine-hearts",
  10: "ten-hearts",
  11: "jack-hearts",
  12: "queen-hearts",
  13: "king-hearts",
  14: "ace-diamonds",
  15: "two-diamonds",
  16: "three-diamonds",
  17: "four-diamonds",
  18: "five-diamonds",
  19: "six-diamonds",
  20: "seven-diamonds",
  21: "eight-diamonds",
  22: "nine-diamonds",
  23: "ten-diamonds",
  24: "jack-diamonds",
  25: "queen-diamonds",
  26: "king-diamonds",
  27: "ace-spades",
  28: "two-spades",
  29: "three-spades",
  30: "four-spades",
  31: "five-spades",
  32: "six-spades",
  33: "seven-spades",
  34: "eight-spades",
  35: "nine-spades",
  36: "ten-spades",
  37: "jack-spades",
  38: "queen-spades",
  39: "king-spades",
  40: "ace-clubs",
  41: "two-clubs",
  42: "three-clubs",
  43: "four-clubs",
  44: "five-clubs",
  45: "six-clubs",
  46: "seven-clubs",
  47: "eight-clubs",
  48: "nine-clubs",
  49: "ten-clubs",
  50: "jack-clubs",
  51: "queen-clubs",
  52: "king-clubs",
};

const cardToValueDict = {
  "ace-hearts": 11,
  "two-hearts": 2,
  "three-hearts": 3,
  "four-hearts": 4,
  "five-hearts": 5,
  "six-hearts": 6,
  "seven-hearts": 7,
  "eight-hearts": 8,
  "nine-hearts": 9,
  "ten-hearts": 10,
  "jack-hearts": 10,
  "queen-hearts": 10,
  "king-hearts": 10,
  "ace-diamonds": 11,
  "two-diamonds": 2,
  "three-diamonds": 3,
  "four-diamonds": 4,
  "five-diamonds": 5,
  "six-diamonds": 6,
  "seven-diamonds": 7,
  "eight-diamonds": 8,
  "nine-diamonds": 9,
  "ten-diamonds": 10,
  "jack-diamonds": 10,
  "queen-diamonds": 10,
  "king-diamonds": 10,
  "ace-spades": 11,
  "two-spades": 2,
  "three-spades": 3,
  "four-spades": 4,
  "five-spades": 5,
  "six-spades": 6,
  "seven-spades": 7,
  "eight-spades": 8,
  "nine-spades": 9,
  "ten-spades": 10,
  "jack-spades": 10,
  "queen-spades": 10,
  "king-spades": 10,
  "ace-clubs": 11,
  "two-clubs": 2,
  "three-clubs": 3,
  "four-clubs": 4,
  "five-clubs": 5,
  "six-clubs": 6,
  "seven-clubs": 7,
  "eight-clubs": 8,
  "nine-clubs": 9,
  "ten-clubs": 10,
  "jack-clubs": 10,
  "queen-clubs": 10,
  "king-clubs": 10,
};

const gameStateDict = {
  won: 0,
  lost: 1,
  draw: 2,
};

// Game starts
var deck = initDeck();
var playerHand = [];
var computerHand = [];

startingDeal();

// Returns fresh deck with 52 cards
function initDeck() {
  let deck = [];

  for (let i = 1; i <= 52; i++) {
    deck.push(i);
  }

  return deck;
}

function startingDeal() {
  // Deal two cards to player
  for (let i = 0; i < 2; i++) {
    let randomNumber = Math.floor(Math.random() * 52) + 1;
    let randomCard = deck.splice(deck.indexOf(randomNumber), 1)[0];

    playerHand.push(randomCard);
    displayCard(randomCard, true);
  }

  // Deal two cards to computer
  for (let i = 0; i < 2; i++) {
    let randomNumber = Math.floor(Math.random() * 52) + 1;
    let randomCard = deck.splice(deck.indexOf(randomNumber), 1)[0];

    computerHand.push(randomCard);
  }

  displayCard(computerHand[0], false);

  // If player got 21 on first deal, player stands and computer tries to equalize
  if (getHandValue(playerHand, false) === 21) {
    document.getElementById("button-hit").setAttribute("disabled", true);
    document.getElementById("button-stand").setAttribute("disabled", true);

    playComputer();
  }
}

// Appends img element for given card
// If isPlayer is true show image on players board, otherwise show image on computers board
function displayCard(randomCard, isPlayer) {
  const cardImg = document.createElement("img");

  const cardSrc = "static/images/" + numberToCardDict[randomCard] + ".svg";
  cardImg.setAttribute("src", cardSrc);

  if (isPlayer) {
    document.getElementById("player-board-container").appendChild(cardImg);
  } else {
    document.getElementById("computer-board-container").appendChild(cardImg);
  }
}

function getCardValue(number) {
  let card = numberToCardDict[number];

  return cardToValueDict[card];
}

// Second argument suggests if the ace value should be 1 or 11
// On the first deal, ace value is always 11
// On other deals, ace value is 11 if hand value is <= 21, otherwise ace value is 1
// configureAceValue is false on first deal
// configureAceValue is true on other deals, meaning the hand value needs to be calculated to decide ace's value
function getHandValue(hand, configureAceValue) {
  let handValue = 0;

  for (let i = 0; i < hand.length; i++) {
    let cardValue = getCardValue(hand[i]);

    if (cardValue === 11 && configureAceValue && handValue + cardValue > 21) {
      cardValue = 1;
    }

    handValue += cardValue;
  }

  return handValue;
}

function hit() {
  let randomNumber = Math.floor(Math.random() * 52) + 1;
  let randomCard = deck.splice(deck.indexOf(randomNumber), 1)[0];
  playerHand.push(randomCard);

  displayCard(randomCard, true);

  if (getHandValue(playerHand, true) > 21) {
    gameState = gameStateDict["lost"];

    document.getElementById("button-hit").setAttribute("disabled", true);
    document.getElementById("button-stand").setAttribute("disabled", true);

    displayCard(computerHand[1], false);

    printGameState(gameState);
  }

  if (getHandValue(playerHand, true) == 21) {
    document.getElementById("button-hit").setAttribute("disabled", true);
    document.getElementById("button-stand").setAttribute("disabled", true);

    playComputer();
  }
}

function stand() {
  document.getElementById("button-hit").setAttribute("disabled", true);
  document.getElementById("button-stand").setAttribute("disabled", true);

  playComputer();
}

function playComputer() {
  let playerHandValue = getHandValue(playerHand, true);

  if (getHandValue(computerHand, true) > playerHandValue) {
    gameState = gameStateDict["lost"];

    displayCard(computerHand[1], false);
  } else {
    displayCard(computerHand[1], false);

    while (true) {
      let randomNumber = Math.floor(Math.random() * 52) + 1;
      let randomCard = deck.splice(deck.indexOf(randomNumber), 1)[0];
      computerHand.push(randomCard);

      displayCard(randomCard, false);

      let computerHandValue = getHandValue(computerHand, true);

      if (computerHandValue > 21) {
        gameState = gameStateDict["won"];
        break;
      } else if (computerHandValue === 21) {
        if (playerHandValue < 21) {
          gameState = gameStateDict["lost"];
          break;
        } else if (playerHandValue === 21) {
          gameState = gameStateDict["draw"];
          break;
        }
      } else {
        if (computerHandValue > playerHandValue) {
          gameState = gameStateDict["lost"];
          break;
        }
      }
    }
  }

  printGameState(gameState);
}

function newGame() {
  deck = initDeck();
  playerHand = [];
  computerHand = [];
  gameState = undefined;

  document.getElementById("button-hit").removeAttribute("disabled");
  document.getElementById("button-stand").removeAttribute("disabled");

  var playerBoardContainer = document.getElementById("player-board-container");
  while (playerBoardContainer.firstChild) {
    playerBoardContainer.removeChild(playerBoardContainer.lastChild);
  }

  var computerBoardContainer = document.getElementById(
    "computer-board-container"
  );
  while (computerBoardContainer.firstChild) {
    computerBoardContainer.removeChild(computerBoardContainer.lastChild);
  }

  var resultContainer = document.getElementById("result-container");
  if (resultContainer.lastChild) {
    resultContainer.removeChild(resultContainer.lastChild);
  }

  startingDeal();
}

function printHand(hand) {
  let cards = [];

  for (let i = 0; i < hand.length; i++) {
    cards.push(getCardValue(hand[i]));
  }

  return cards.join(" + ") + " (" + getHandValue(hand, true) + ")";
}

function printGameState(gameState) {
  for (const property in gameStateDict) {
    if (gameStateDict[property] === gameState) {
      var h2 = document.createElement("h2");
      h2.innerText = property.toUpperCase();

      document.getElementById("result-container").appendChild(h2);

      return;
    }
  }
}
