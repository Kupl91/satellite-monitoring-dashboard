  // src/components/MapView/MapView.tsx
  import React from 'react';
  import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  import { useNavigate } from 'react-router-dom';
  import L from 'leaflet';
  import { useGetSatellitesQuery } from '../../services/satellitesApi';
  import './MapView.css';
  import communicationIcon from '../../assets/communication-icon.png';
  import navigationIcon from '../../assets/navigation-icon.png';
  import scientificIcon from '../../assets/scientific-icon.png';
  import defaultIcon from '../../assets/default-icon.png';

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

  const handleMarkerClick = (id: string) => {
    navigate(`/satellite/${id}`);
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} className="map-view">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {satellites?.map((sat) => (
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
              <strong>{sat.name}</strong><br />
              Тип: {sat.type}<br />
              Статус: {sat.status}
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  );
};

export default MapView;