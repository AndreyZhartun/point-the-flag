import React, { useRef, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import GuessGame from './GuessGame';
import '../styles/GuessMap.css';

import { useDispatch, useSelector } from 'react-redux';
import { changeMarkerPosition } from '../redux/ActionCreators';

const GuessMap = () => {

  const dispatch = useDispatch();
  //const refmarker = useRef(null)

  const {
    map,
    marker,
    requestSent
  } = useSelector((state) => ({
    map: state.map,
    marker: state.marker,
    requestSent: state.requestSent
  }));

  const refmarker = useRef(null);
  const refmap = useRef(null);

  //обновить координаты маркера в store, используемые при запросе к API
  const updatePosition = () => {
    const marker = refmarker.current;
    if (marker != null) {
      const newPosition = marker.leafletElement.getLatLng();
      dispatch(changeMarkerPosition(newPosition.lat, newPosition.lng));
    }
  }

  //useEffect
  useEffect(() => {
    //фикс странного бага непрогрузки карты, видимо вызываемого конфликтом leaflet и create-react-app
    if (refmap.current) {
      refmap.current.leafletElement.invalidateSize();
    }
  });

  return (
    <section>
      <Map center={map.center} zoom={map.zoom} ref={refmap}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={!requestSent}
          onDragend={updatePosition}
          position={marker}
          ref={refmarker}>
        </Marker>
      </Map>
      <GuessGame />
    </section>
  );
}

export default GuessMap;