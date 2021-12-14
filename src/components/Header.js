import React, { Component } from 'react';
import './styles/Header.css';
// import Logo from '../assets/img/logo.png';

export default class Header extends Component {
  render() {
    return (
      <header className="d-flex border-bottom mainHeader">
        <div className="title text-white font-weight-bolder manual-logo d-flex">Solumemo
          <button
            className="btnReset ml-5 pb-4 manual-logo shadow-light btn-vert btn btn-success btn-sm shadow-lg border"
            onClick={this.props.resetGame}
          // Llama a una función que resetea el contador definida dentro del componente padre
          >
            Volver a jugar
            </button>

        </div>
        {/* <img src={Logo} alt="Logo Solumemo" width="50" className="mt-5 pt-5 ml-0 pl-0" /> */}
        <div className="title text-white manual-logo">
          Intentos: {this.props.tries}
        </div>
      </header>
    );
  }
};
