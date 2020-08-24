import React, { createRef, Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import GuessGame from './GuessGame';
import '../styles/GuessMap.css';

import { connect } from 'react-redux';
import { changeMarkerPosition } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    map: state.map,
    marker: state.marker,
    requestSent: state.requestSent
  }
}

const mapDispatchToProps = dispatch => ({
  changeMarkerPosition: (lat, lng) => dispatch(changeMarkerPosition(lat, lng))
});

class GuessMap extends Component<{}, State> {

  refmarker = createRef()
  refmap = createRef()

  //обновить координаты маркера в store, используемые при запросе к API
  updatePosition = () => {
    const marker = this.refmarker.current;
    if (marker != null) {
      const newPosition = marker.leafletElement.getLatLng();
      this.props.changeMarkerPosition(newPosition.lat, newPosition.lng);
    }
  }

  componentDidUpdate = () => {
    //фикс странного бага непрогрузки карты, видимо вызываемого конфликтом leaflet и create-react-app
    if (this.refmap.current) {
      this.refmap.current.leafletElement.invalidateSize();
    }
  }

  render() {
    return (
      <section>
        <Map center={this.props.map.center} zoom={this.props.map.zoom} ref={this.refmap}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            draggable={!this.props.requestSent}
            onDragend={this.updatePosition}
            position={this.props.marker}
            ref={this.refmarker}>
          </Marker>
        </Map>
        <GuessGame />
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuessMap);