import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faQuestion, faAddressCard, faCode, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

/**
 * Верхняя панель с названием и ссылками
 */
const Header: React.FC = () => <header>
  <nav className="nav">
    <div className="hide-on-desktop">
      <span className="nav__item">
        Потяните&nbsp;
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        &nbsp;, чтобы указать страну
      </span>
    </div>
    <ul>
      <div className="hide-on-mobile">
        <li className="nav__item">
          <span className="nav__title">
            <FontAwesomeIcon icon={faFlag} />
            <FontAwesomeIcon icon={faQuestion} />
            &nbsp;
            Укажите страну по ее флагу
          </span>
        </li>
      </div>
      <li className="nav__item">
        <a href="https://github.com/AndreyZhartun/point-the-flag" className="nav__link">
          <FontAwesomeIcon icon={faCode} />
          &nbsp;
          <span className="hide-on-mobile">Github</span>
        </a>
      </li>
      <li className="nav__item">
        <a href="/" className="nav__link">
          <FontAwesomeIcon icon={faAddressCard} />
          &nbsp;
          <span className="hide-on-mobile">Про меня</span>
        </a>
      </li>
    </ul>
    <div className="hide-on-mobile">
      <div className="nav__item">
        <a className="nav__link" href="https://reactjs.org/">
          React
        </a>,&nbsp;
        <a className="nav__link" href="https://leafletjs.com/">
          leaflet.js
        </a>,&nbsp;
        <a className="nav__link" href="https://nominatim.org/release-docs/develop/api/Reverse/">
          Nominatim API
        </a>
      </div>
    </div>
  </nav>
</header>;

export default Header;