import React, { createRef, Component } from 'react';

import { Card, CardHeader, CardBody, CardText, CardImg, CardFooter, Button } from 'reactstrap';
import { Media } from 'reactstrap';

import { connect } from 'react-redux';
import { changeMarkerPosition } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      flags: state.flags,
      map: state.map,
      marker: state.marker
    }
  }
  
const mapDispatchToProps = dispatch => ({
  changeMarkerPosition: (lat, lng) => dispatch(changeMarkerPosition(lat, lng))
});

class GuessGame extends Component {
  render() {
    return (
      <Card>
      <CardHeader>Card header</CardHeader>
      <CardBody className="text-center">
        <CardText>coordinates here</CardText>
        <Media left>
            <Media object src="assets/country_flags/de.png" alt="Generic placeholder image" />
        </Media>
        <Media body>
            <Media heading>
            Media heading
            </Media>
            Cras sit amet nibh libero, in
        </Media>
        <Button>click me</Button>
      </CardBody>
      <CardFooter>:)</CardFooter>
      </Card>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessGame);