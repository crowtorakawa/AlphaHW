//遊戲狀態
const GAME_STATE ={
    FirstCardAwaits: "FirstCardAwaits", //第一次翻牌
    SecondCardAwaits: "SecondCardAwaits", //第二次翻牌
    CardsMatchFailed: "CardsMatchFailed", //配對失敗
    CardsMatched: "CardsMatched", //配對成功
    GameFinished: "GameFinished" //遊戲結束
}
//撲克牌花色
const Symbols=[
    './Spades.png','./heart.png','./diamonds.png','./club.png'
]

const model = {
  revealedCards: [],
  
  isRevealedCardsMatched() {
      return this.revealedCards[0].dataset.index % 13 === this.revealedCards[1].dataset.index % 13 
    },
    score: 0,
    triedTimes:0
}

const view = {
  appendWrongAnimation(...cards) {
    cards.map(card => {
      card.classList.add('wrong')
      card.addEventListener('animationend', event =>   event.target.classList.remove('wrong'), { once: true })
      })
    }, 
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
    },
    flipCards (...cards) {
      cards.map(card => {
        if (card.classList.contains('back')) {
          card.classList.remove('back')
          card.innerHTML = this.getCardContent(Number(card.dataset.index))
          return
        }
        card.classList.add('back')
        card.innerHTML = null
      })
    },
    pairCards (...cards) {
      cards.map(card => {
        card.classList.add('paired')
      })
    },
    pairCard(card) {
        card.classList.add('paired')
    },
    renderScore(score){
      document.querySelector(".score").textContent = `Score：${score}`
    },
    renderTriedTimes(times) {
      document.querySelector('.tried').textContent =`You've tried: ${times}`
    },showGameFinished () {
      const div = document.createElement('div')
      div.classList.add('completed')
      div.innerHTML = `
        <p>Complete!</p>
        <p>Score: ${model.score}</p>
        <p>You've tried: ${model.triedTimes} times</p>
        <img class="finishImg01" src="./gameImg.png">
        <img class="finishImg02" src="./club.png">
      `
      const header = document.querySelector('#header')
      header.before(div)
    }
}

const controller = {
  // 加在第一行表遊戲狀態
  currentState: GAME_STATE.FirstCardAwaits,  
  // 基本產生撲克牌堆-----------------------------------------
  generateCards () {
      view.displayCard(utility.getRandomNumberArray(52))
    },
  //--------------------------------------------------------
    dispatchCardAction (card) {
      if (!card.classList.contains('back')) {
        return
      }
//--------------讀取狀態別--------------------------
      switch (this.currentState) {
        case GAME_STATE.FirstCardAwaits:
          view.flipCards(card)
          model.revealedCards.push(card)
          this.currentState = GAME_STATE.SecondCardAwaits
          break

        case GAME_STATE.SecondCardAwaits:
          view.renderTriedTimes(++model.triedTimes)  // add this 
          view.flipCards(card)
          model.revealedCards.push(card)
//------------------------------------------------------

          // 判斷配對是否成功
          if (model.isRevealedCardsMatched()) {
              // 配對成功
              view.renderScore(model.score += 10)
              this.currentState = GAME_STATE.CardsMatched
              view.pairCards(model.revealedCards[0])
              view.pairCards(model.revealedCards[1])
              model.revealedCards = []
              if (model.score === 260) {
                console.log('showGameFinished')
                this.currentState = GAME_STATE.GameFinished
                view.showGameFinished()  // 加在這裡
                return
              }
              this.currentState = GAME_STATE.FirstCardAwaits
            } else {
              // 配對失敗
              // setTimeout(() => {
              //   view.flipCards(model.revealedCards[0])
              //   view.flipCards(model.revealedCards[1])
              //   model.revealedCards = []
              //   this.currentState = GAME_STATE.FirstCardAwaits
              // }, 1000)
              this.currentState = GAME_STATE.CardsMatchFailed
              view.appendWrongAnimation(...model.revealedCards)  // add this
              setTimeout(this.resetCards, 1000)
            }
          break
      }
      console.log('this.currentState', this.currentState)
      console.log('revealedCards', model.revealedCards.map(card => card.dataset.index))
    },
    resetCards () {
      view.flipCards(...model.revealedCards)
      model.revealedCards = []
      controller.currentState = GAME_STATE.FirstCardAwaits
    } 
}

//亂數與洗牌
const utility = {
    getRandomNumberArray(count){
        const number = Array.from(Array(count).keys())
        console.log(number)
        for(let index = number.length-1;index >0;index--){
            let randomIndex = Math.floor(Math.random()* (index +1))
                ;[number[index],number[randomIndex]]=[number[randomIndex],number[index]]
        }
        return number
    }
}


//基本啟動運作----------------------------------------
controller.generateCards()

//事件
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click',event => {
        // console.log(card)
        controller.dispatchCardAction(card)
    })
});
//------------------------------------------------------
