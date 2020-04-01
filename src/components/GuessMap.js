import React, { createRef, Component } from 'react';
import { Button } from 'reactstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { Container, Row, Col } from 'reactstrap';
import GuessGame from './GuessGame';

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

class GuessMap extends Component<{}, State> {
  // $FlowFixMe: ref
  //refmarker = createRef<Marker>()
  refmarker = createRef()

  toggleDraggable = () => {
    // + action
    //this.setState({ draggable: !this.state.draggable })
  }

  updatePosition = () => {    
    const marker = this.refmarker.current;
    if (marker != null) {
      const newPosition = marker.leafletElement.getLatLng();
      // + action
      changeMarkerPosition(newPosition.lat, newPosition.lng);
    }
  }

  handleClick = () => {
    // + action
    //send a http request to get country
  }

  render() {
    const position = [this.props.map.center.lat, this.props.map.center.lng]
    const markerPosition = [this.props.marker.lat, this.props.marker.lng]

    return (
      <Container>
        <Row className="row row-content">
          <Col xs="12" sm="6">
            <Map center={position} zoom={this.props.map.zoom}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                draggable={this.props.marker.draggable}
                onDragend={this.updatePosition}
                position={markerPosition}
                ref={this.refmarker}>
                <Popup minWidth={90}>
                  <span onClick={this.toggleDraggable}>
                    {this.props.marker.draggable}
                  </span>
                  <Button color="primary" size="sm" onClick={this.handleClick}> Click me</Button>
                </Popup>
              </Marker>
            </Map>
          </Col>
          <Col xs="12" sm="6">
            <GuessGame />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessMap);