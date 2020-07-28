import React, { Component } from 'react';
import { Navbar, NavbarText, NavItem, NavLink, Nav } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faQuestion, faAddressCard, faCode } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar dark>
          <Nav className="mr-auto" style={{ flexDirection: "row" }} navbar>
            <NavItem active>
              <NavLink style={{ padding: "0.5rem" }}>
                <FontAwesomeIcon icon={faFlag} />
                <FontAwesomeIcon icon={faQuestion} />
                {" Укажите страну по ее флагу"}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ padding: "0.5rem" }} href="https://github.com/AndreyZhartun/point-the-flag">
                <FontAwesomeIcon icon={faCode} />
                {" Github "}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">
                <FontAwesomeIcon icon={faAddressCard} />
                {" Про меня"}
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>React, leaflet.js, Nominatim API</NavbarText>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Header;