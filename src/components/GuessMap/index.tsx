import React, { useRef, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import GuessGame from '../GuessGame';
import './GuessMap.css';

import { useDispatch, useSelector } from 'react-redux';
import { changeMarkerPosition } from '../../redux/actions/ActionCreators';
import { RootState } from '../../redux/types';

/**
 * Карта с перетаскиваниевым маркером
 */
const GuessMap: React.FC = () => {

  const dispatch = useDispatch();

  const {
    map,
    marker,
    requestSent
  } = useSelector((state: RootState) => ({
    map: state.map,
    marker: state.marker,
    requestSent: state.requestSent
  }));

  const refmarker = useRef<Marker>(null);
  const refmap = useRef<Map>(null);

  //обновить координаты маркера в store, используемые при запросе к API
  const updatePosition = () => {
    const marker = refmarker.current;
    if (marker) {
      const newPosition = marker.leafletElement.getLatLng();
      dispatch(changeMarkerPosition(newPosition.lat, newPosition.lng));
    }
  }

  useEffect(() => {
    //фикс странного бага непрогрузки карты, видимо вызываемого конфликтом leaflet и create-react-app
    if (refmap.current) {
      refmap.current.leafletElement.invalidateSize();
    }
  });

  return <section>
    <Map center={map.center} zoom={map.zoom} ref={refmap}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        draggable={!requestSent}
        ondragend={updatePosition}
        position={marker}
        ref={refmarker} />
    </Map>
    <GuessGame />
  </section>;
}

export default GuessMap;