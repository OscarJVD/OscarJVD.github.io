import React, { Component } from 'react';
import CardMemo from './CardMemo'
import './styles/Deck.css'

export default class Deck extends Component {
  render() {
    return (
      <div className="deck">
        {
          this.props.deck
            .map((card, i) => {
              const isBeingCompared = this.props.selectedCouple.indexOf(card) > -1;
              return <CardMemo
                key={i}
                icon={card.icon}
                isBeingCompared={isBeingCompared}
                setCard={() => this.props.setCard(card)}
                wasGuessed={card.wasGuessed}
              />;
            })
        }
      </div>
    );
  }
};

