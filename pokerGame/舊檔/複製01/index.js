const GAME_STATE ={
  FirstCardAwaits: "FirstCardAwaits", //第一次翻牌
  SecondCardAwaits: "SecondCardAwaits", //第二次翻牌
  CardsMatchFailed: "CardsMatchFailed", //配對失敗
  CardsMatched: "CardsMatched", //配對成功
  GameFinished: "GameFinished", //遊戲結束
}

const Symbols=[
  './Spades.png','./heart.png','./diamonds.png','./club.png'
]
const view = { 
  getCardElement(index){
      return `<div data-index="${index}" class = "card back"></div>`
  },
  getCardContent(index){
      const number = this.transformNumber((index%13)+1)
      const symbol = Symbols[Math.floor(index/13)] 
      return `
          
          <p>${number}</p>
          <img src="${symbol}">
          <p>${number}</p>
          
      `
  },
  transformNumber(number){
      switch (number) {
          case 1:
            return 'A'
          case 11:
            return 'J'
          case 12:
            return 'Q'
          case 13:
            return 'K'
          default:
            return number
      }
  },
  displayCard(indexes){
      const rootElement = document.querySelector('#cards')
      rootElement.innerHTML = indexes.map(index => this.getCardElement(index)).join('')
      // rootElement.innerHTML =utility.getRandomNumberArray(52).map(index => this.getCardElement(index)).join("");
  },
  
  flipCard(card){
      // console.log(card)
      if(card.classList.contains('back')){
          card.classList.remove('back')
          card.innerHTML = this.getCardContent(Number(card.dataset.index)) // 暫時給定 10
          return
      }
      card.classList.add('back')
      card.innerHTML = null
  }
  
 
}

const utility = {
  getRandomNumberArray(count){
      const number = Array.from(Array(count).keys())
      for(let index = number.length-1;index >0;index--){
          let randomIndex = Math.floor(Math.random()* (index +1))
              ;[number[index],number[randomIndex]]=[number[randomIndex],number[index]]
      }
      return number
  }
}

const controller = {
  currentState: GAME_STATE.FirstCardAwaits,  // 加在第一行
  generateCards () {
      view.displayCard(utility.getRandomNumberArray(52))
    }
  
}
const model = {
  revealedCards: []
}
controller.generateCards()


document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click',event => {
      // console.log(card)
      view.flipCard(card)
  })
});