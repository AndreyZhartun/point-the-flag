import React, { createRef, Component } from 'react';
import { Button } from 'reactstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

type Position = { lat: number, lng: number }

type State = {
  center: Position,
  marker: Position,
  zoom: number,
  draggable: boolean,
}

export default class GuessMap extends Component<{}, State> {
  state = {
    center: {
      lat: 51.505,
      lng: -0.09,
    },
    marker: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 3,
    draggable: true,
    popupText: 'popup-text'
  }
  // $FlowFixMe: ref
  //refmarker = createRef<Marker>()
  refmarker = createRef()

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable })
  }

  updatePosition = () => {
    const marker = this.refmarker.current
    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng(),
        popupText: 'Current position: ' + marker.leafletElement.getLatLng()
      })
    }
  }

  handleClick = () => {
    //send a http request to get country
  }

  render() {
    const position = [this.state.center.lat, this.state.center.lng]
    const markerPosition = [this.state.marker.lat, this.state.marker.lng]

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={this.state.draggable}
          onDragend={this.updatePosition}
          position={markerPosition}
          ref={this.refmarker}>
          <Popup minWidth={90}>
            <span onClick={this.toggleDraggable}>
              {this.state.popupText}
            </span>
            <Button color="primary" size="sm" onClick={this.handleClick}> Click me</Button>
          </Popup>
        </Marker>
      </Map>
    )
  }
}