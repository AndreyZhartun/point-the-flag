import React, { createRef, Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import GuessGame from './GuessGame';

import { connect } from 'react-redux';
import { changeMarkerPosition } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
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
  refmap = createRef()

  toggleDraggable = () => {
    // + action
    //this.setState({ draggable: !this.state.draggable })
  }

  componentDidMount() {
  }

  updatePosition = () => {    
    const marker = this.refmarker.current;
    if (marker != null) {
      const newPosition = marker.leafletElement.getLatLng();
      // + action
      this.props.changeMarkerPosition(newPosition.lat, newPosition.lng);
    }
  }

  componentDidUpdate = () => {
    if (this.refmap.current) {
      this.refmap.current.leafletElement.invalidateSize();
    }
  }

  render() {
    const position = [this.props.map.center.lat, this.props.map.center.lng];
    const markerPosition = [this.props.marker.lat, this.props.marker.lng];

    return (
      <div>
        
      <Map center={position} zoom={this.props.map.zoom} ref={this.refmap}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={this.props.marker.draggable}
          onDragend={this.updatePosition}
          position={markerPosition}
          ref={this.refmarker}>
        </Marker>
      </Map>
      <GuessGame />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessMap);