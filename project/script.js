var cardboard = document.querySelector("#cardboard")
var imgs = [
  "angular.svg",
  "aurelia.svg",
  "backbone.svg",
  "ember.svg",
  "react.svg",
  "vue.svg"
]

var cardHTML = ''

imgs.forEach(img => {
  cardHTML +=`<div class="memory-card" data-card="${img}">
  <img class="front-face" src="img/${img}">
  <img class="back-face" src="img/js-badge.svg">
  </div>
  `
})

cardboard.innerHTML = cardHTML + cardHTML

/* fim renderização HTML*/

let firstCard, secondCard;
let lockCard = false
const cards = document.querySelectorAll('.memory-card')

function flipCard(){
  if(lockCard) return false
  this.classList.add('flip')

  if(!firstCard){
    firstCard = this
    return false
  }

  secondCard = this

  checkForMatch()
}

function checkForMatch(){
  let isMatch = firstCard.dataset.card === secondCard.dataset.card
  !isMatch ? removeFlip() : resetCards(isMatch);
}

function removeFlip(){
  lockCard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetCards()
  }, 1000);
}

(function random(){
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * 12)
    card.style.order = rand})
})()

function resetCards(isMatch = false){
  if(isMatch){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
  }
  firstCard = null;
  secondCard = null;
  lockCard = false;
}

cards.forEach(card => card.addEventListener('click', flipCard))