// src/components/MapView/MapView.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { useGetSatellitesQuery } from '../../services/satellitesApi';
import './MapView.css';
import communicationIcon from '../../assets/communication-icon.png';
import navigationIcon from '../../assets/navigation-icon.png';
import scientificIcon from '../../assets/scientific-icon.png';
import defaultIcon from '../../assets/default-icon.png';

// Определение иконок для разных типов спутников
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

const MapView: React.FC = () => {
  const { data: satellites, error, isLoading } = useGetSatellitesQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Загрузка карты...</div>;
  if (error) return <div>Ошибка при загрузке карты.</div>;

  // Функция обработки клика на маркер для навигации к деталям спутника
  const handleMarkerClick = (id: string) => {
    navigate(`/satellite/${id}`);
  };

  // Ограничения по границам карты
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
            {/* Popup при клике на маркер */}
            <Popup>
              <strong>{sat.name}</strong>
              <br />
              Тип: {sat.type}
              <br />
              Статус: {sat.status}
              <br />
              <button onClick={() => handleMarkerClick(sat.id)}>Подробнее</button>
            </Popup>

            {/* Tooltip при наведении на маркер */}
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
};

export default MapView;