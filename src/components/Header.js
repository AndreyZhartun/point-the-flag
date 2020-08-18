import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faQuestion, faAddressCard, faCode, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <nav>
          <ul className="hide-on-mobile" navbar>
            <li>
              <span>
                <FontAwesomeIcon icon={faFlag} />
                <FontAwesomeIcon icon={faQuestion} />
                {" Укажите страну по ее флагу"}
              </span>
            </li>
            <li className="hide-on-mobile">
              <a href="https://github.com/AndreyZhartun/point-the-flag">
                <FontAwesomeIcon icon={faCode} />
                {" Github "}
              </a>
            </li>
            <li className="hide-on-mobile">
              <a href="/">
                <FontAwesomeIcon icon={faAddressCard} />
                {" Про меня"}
              </a>
            </li>
          </ul>
          <span className="hide-on-mobile">React, leaflet.js, Nominatim API</span>
          <span className="hide-on-desktop">
            {"Потяните "}
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {", чтобы указать страну"}
          </span>
        </nav>
      </React.Fragment>
    );
  }
}

export default Header;