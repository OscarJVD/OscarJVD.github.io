import React, {Component} from 'react';
import './styles/Card.css';
import FlipCard from 'react-flipcard';

export default class CardMemo extends Component {
  render() {
    return (
      <div className="cardMemo border card px-0 card-custom item-card card-block border-white border" onClick={this.props.setCard}>
        <FlipCard
          flipped={this.props.isBeingCompared || this.props.wasGuessed}
          disabled={true}
        >
          <div className="cover"></div>
          <div className="content">
            <i className={`fa ${this.props.icon} fa-5x`}></i>
            {/* <i className={`https://rickandmortyapi.com/api/character/avatar/${this.props.icon}.jpeg`}></i> */}
            {/* <img src={`https://rickandmortyapi.com/api/character/avatar/${this.props.icon}.jpeg`} alt="ImgRM"/> */}
          </div>
        </FlipCard>
      </div>
    )
  }
};
