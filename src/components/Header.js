import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default class Header extends Component {
  render() {
    return(
    <React.Fragment>
      <Navbar dark>
        <div className="container">
            <NavbarBrand href="/">guess te flag</NavbarBrand>
        </div>
      </Navbar>
    </React.Fragment>
    );
  }
}