import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const indiaCenter = [22.5937, 78.9629];
const indiaZoom = 5;

function HighlightMarker({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 8);
  }, [position, map]);
  return null;
}

export default function HospitalMap({ hospitals, selectedHospital, onSelectHospital }: any) {
  return (
    <MapContainer center={indiaCenter} zoom={indiaZoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {hospitals.map((h: any) => (
        <Marker
          key={h.id}
          position={[h.lat, h.lng]}
          eventHandlers={{ click: () => onSelectHospital(h) }}
        >
          <Popup>
            <b>{h.name}</b>
            <br />
            {h.city}, {h.state}
          </Popup>
        </Marker>
      ))}
      {selectedHospital && (
        <HighlightMarker position={[selectedHospital.lat, selectedHospital.lng]} />
      )}
    </MapContainer>
  );
}

