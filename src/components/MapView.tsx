import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useGetSatellitesQuery } from '../services/satellitesApi';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const SatelliteIcon = (type: string) => {
  let iconUrl = '';
  switch (type) {
    case 'communication':
      iconUrl = '/icons/communication.png'; // Замените на реальные пути к иконкам
      break;
    case 'navigation':
      iconUrl = '/icons/navigation.png';
      break;
    case 'scientific':
      iconUrl = '/icons/scientific.png';
      break;
    default:
      iconUrl = '/icons/default.png';
  }
  
  return new L.Icon({
    iconUrl,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -25],
  });
};

const MapView: React.FC = () => {
  const { data: satellites, error, isLoading } = useGetSatellitesQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Загрузка карты...</div>;
  if (error) return <div>Ошибка при загрузке карты.</div>;

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {satellites?.map((satellite) => (
        satellite.coordinates.latitude && satellite.coordinates.longitude ? (
          <Marker
            key={satellite.id}
            position={[satellite.coordinates.latitude, satellite.coordinates.longitude]}
            icon={SatelliteIcon(satellite.type)}
            eventHandlers={{
              click: () => {
                navigate(`/satellite/${satellite.id}`);
              },
            }}
          >
            <Popup>
              <strong>{satellite.name}</strong><br />
              Тип: {satellite.type}<br />
              Статус: {satellite.status}
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  );
};

export default MapView;