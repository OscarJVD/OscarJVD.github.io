import React, { Component } from 'react';
import Header from './components/Header';
import Deck from './components/Deck';
import BuildDeck from './providers/BuildDeck';
import Swal from 'sweetalert';
import './App.css';
import swal from 'sweetalert';

const getInitialStatus = () => {

  const deck = BuildDeck()
  console.log(deck);

  return {
    deck,
    selectedCouple: [], // pareja seleccionaada
    isBeingCompared: false,
    tries: 0
  };
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = getInitialStatus();
  }

  render() {
    return (
      <div className="App">
        <Header
          tries={this.state.tries}
          resetGame={() => this.resetGame()}
        />
        <Deck
          deck={this.state.deck}
          selectedCouple={this.state.selectedCouple}
          setCard={card => this.setCard(card)}
        />
      </div>
    );
  }


  setCard(card) {
    if (
      this.state.isBeingCompared ||
      this.state.selectedCouple.indexOf(card) > -1 ||
      card.wasGuessed
    ) return;


    const selectedCouple = [...this.state.selectedCouple, card];

    this.setState({ selectedCouple });

    if (selectedCouple.length === 2) this.compareCouple(selectedCouple);

  }

  compareCouple(selectedCouple) {

    this.setState({ isBeingCompared: true });

    setTimeout(() => {

      const [firstCard, secondCard] = selectedCouple;

      let deck = this.state.deck;


      if (firstCard.icon === secondCard.icon) {

        deck = deck.map(card => {

          if (card.icon !== firstCard.icon) return card;

          return { ...card, wasGuessed: true };

        });
      }

      this.valEndGame(deck)

      this.setState({
        selectedCouple: [],
        deck,
        isBeingCompared: false,
        tries: this.state.tries + 1
      })

    }, 1700)
  }

  valEndGame(deck) {
    if (
      deck.filter(card => !card.wasGuessed).length === 0
    )
      swal('Fin del juego', `Ganaste en ${this.state.tries} intentos!`);
  }

  resetGame() { this.setState(getInitialStatus()) }
}

export default App;
