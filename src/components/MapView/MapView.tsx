import React, { useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { useGetSatellitesQuery } from '../../services/satellitesApi';
import './MapView.css';
import communicationIcon from '../../assets/communication-icon.png';
import navigationIcon from '../../assets/navigation-icon.png';
import scientificIcon from '../../assets/scientific-icon.png';
import defaultIcon from '../../assets/default-icon.png';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const icons = {
  communication: L.icon({
    iconUrl: communicationIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  }),
  navigation: L.icon({
    iconUrl: navigationIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  }),
  scientific: L.icon({
    iconUrl: scientificIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  }),
  default: L.icon({
    iconUrl: defaultIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  }),
};

const MapView: React.FC = React.memo(() => {
  const { data: satellites, error, isLoading } = useGetSatellitesQuery();
  const navigate = useNavigate();

  const handleMarkerClick = useCallback((id: string) => {
    navigate(`/satellite/${id}`);
  }, [navigate]);

  if (isLoading) return <Loader message="Загрузка карты..." />;
  if (error) return <ErrorMessage message="Ошибка при загрузке карты." />;

  const bounds: L.LatLngBoundsExpression = [
    [-90, -180],
    [90, 180],
  ];

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      className="map-view"
      minZoom={2}
      maxZoom={18}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      scrollWheelZoom={true}
      dragging={true}
      aria-label="Карта спутников"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {satellites?.map((sat) =>
        sat.coordinates.latitude && sat.coordinates.longitude ? (
          <Marker
            key={sat.id}
            position={[sat.coordinates.latitude, sat.coordinates.longitude]}
            icon={icons[sat.type] || icons.default}
            eventHandlers={{
              click: () => handleMarkerClick(sat.id),
            }}
          >
            <Popup>
              <strong>{sat.name}</strong>
              <br />
              Тип: {sat.type}
              <br />
              Статус: {sat.status}
              <br />
              <button onClick={() => handleMarkerClick(sat.id)} aria-label={`Подробнее о спутнике ${sat.name}`}>
                Подробнее
              </button>
            </Popup>
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
              <div>
                <strong>{sat.name}</strong>
                <br />
                Тип: {sat.type}
                <br />
                Статус: {sat.status}
              </div>
            </Tooltip>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
});

export default MapView;