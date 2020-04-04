import React, { Component } from 'react';
import { Navbar, NavbarText, NavItem, NavLink, Nav, NavbarToggler, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faQuestion, faAddressCard, faCode } from '@fortawesome/free-solid-svg-icons';

export default class Header extends Component {
  render() {
    return(
    <React.Fragment>
      <Navbar dark>
        <Nav className="mr-auto" style={{flexDirection:"row"}} navbar>
          <NavItem active>
            <NavLink style={{padding:"0.5rem"}}>
              <FontAwesomeIcon icon={faFlag} />
              <FontAwesomeIcon icon={faQuestion} />
              {" Guess the country by its flag"}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={{padding:"0.5rem"}} href="#">
              <FontAwesomeIcon icon={faCode} />
              {" Github "}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              <FontAwesomeIcon icon={faAddressCard} />
              {" About Me "}
            </NavLink>
          </NavItem>
        </Nav>
        <NavbarText>React, leaflet.js, Nominatim API</NavbarText>
        </Navbar>
    </React.Fragment>
    );
  }
}