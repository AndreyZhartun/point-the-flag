import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faQuestion, faAddressCard, faCode } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <ul navbar>
            <li>
              <span>
                <FontAwesomeIcon icon={faFlag} />
                <FontAwesomeIcon icon={faQuestion} />
                {" Укажите страну по ее флагу"}
              </span>
            </li>
            <li>
              <a href="https://github.com/AndreyZhartun/point-the-flag">
                <FontAwesomeIcon icon={faCode} />
                {" Github "}
              </a>
            </li>
            <li>
              <a href="/">
                <FontAwesomeIcon icon={faAddressCard} />
                {" Про меня"}
              </a>
            </li>
          </ul>
          <span>React, leaflet.js, Nominatim API</span>
        </nav>
      </React.Fragment>
    );
  }
}

export default Header;