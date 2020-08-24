import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faQuestion, faAddressCard, faCode, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <div className="hide-on-desktop">
            <span className="white nav-item">
              Потяните&nbsp;
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              &nbsp;, чтобы указать страну
            </span>
          </div>
          <ul navbar>
            <div className="hide-on-mobile">
              <li className="nav-item">
                <span className="white">
                  <FontAwesomeIcon icon={faFlag} />
                  <FontAwesomeIcon icon={faQuestion} />
                  &nbsp;
                  Укажите страну по ее флагу
                </span>
              </li>
            </div>
            <li className="nav-item">
              <a href="https://github.com/AndreyZhartun/point-the-flag" className="gray">
                <FontAwesomeIcon icon={faCode} />
                &nbsp;
                <span className="hide-on-mobile">Github</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="gray">
                <FontAwesomeIcon icon={faAddressCard} />
                &nbsp;
                <span className="hide-on-mobile">Про меня</span>
              </a>
            </li>
          </ul>
          <div className="hide-on-mobile">
            <div className="nav-item">
              <span className="hide-on-mobile gray">
                <a className="gray" href="https://reactjs.org/">React</a>, <a className="gray" href="https://leafletjs.com/">leaflet.js</a>, <a className="gray" href="https://nominatim.org/release-docs/develop/api/Reverse/">Nominatim API</a>
              </span>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;