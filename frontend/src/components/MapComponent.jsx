import React, { useState } from 'react'; 
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import '../css/mapstyle.css';

function FlyToLocation({ position }) {
  const map = useMap();
  map.flyTo(position, 12, { animate: true });
  return null;
}

function MapComponent() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [position, setPosition] = useState([-7.5568, 112.2328]); 
  const [showSidebar, setShowSidebar] = useState(false); 
  const targetPosition = [-7.520045399062036, 112.4692722667032];

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
      const results = await response.json();

      if (results && results.length > 0) {
        const { lat, lon } = results[0];
        const newPos = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPos);
      } else {
        alert("Lokasi tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Terjadi kesalahan saat mencari lokasi");
    }
  };

  const handleMarkerClick = () => {
    setShowSidebar(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Sidebar Info */}
      {showSidebar && (
        <div className="sidebar-info">
          <img src="src/assets/background_6.jpg" alt="Kebogerang Field" className="sidebar-image" />
          <button className="close-btn" onClick={() => setShowSidebar(false)}>✖</button>
          <h2>Kebogerang</h2>
          <div className="sidebar-content">
            <p><strong>Informasi Lahan:</strong></p>
            <ul>
              <li>Luas Daerah: 1.5 Hektar</li>
              <li>Jenis Tanah: Liat Berpasir</li>
            </ul>
            <p><strong>Analytics:</strong></p>
            <ul>
              <li>Hasil Panen: 537 kg (Jagung Manis: 400 kg, Tepung Jagung: 137 kg)</li>
            </ul>
            <p><strong>Deskripsi:</strong></p>
            <p>Lahan subur dengan drainase baik, cocok untuk jagung. Pemantauan rutin dan pupuk organik meningkatkan hasil panen.</p>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari lokasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Cari</button>
      </div>

      {/* Map Component */}
      <MapContainer center={position} zoom={12} className="map-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            {searchQuery || "Lokasi"}
          </Popup>
        </Marker>
        <Marker position={targetPosition} eventHandlers={{ click: handleMarkerClick }}>
          <Popup>Informasi Lokasi Khusus</Popup>
        </Marker>
        <FlyToLocation position={position} />
      </MapContainer>
    </div>
  );
}

export default MapComponent;