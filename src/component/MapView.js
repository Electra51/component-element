"use client"
import React, { useState } from 'react';
import { MapPin, Navigation, Plus, Trash2, Info, Search, X } from 'lucide-react';

const MapView = () => {
  const [markers, setMarkers] = useState([
    { id: 1, lat: 23.8103, lng: 90.4125, name: 'Dhaka City Center', info: 'Capital of Bangladesh' },
    { id: 2, lat: 23.7805, lng: 90.4158, name: 'Gulshan', info: 'Diplomatic Zone' },
    { id: 3, lat: 23.7461, lng: 90.3742, name: 'Dhanmondi', info: 'Residential Area' }
  ]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [markerForm, setMarkerForm] = useState({ name: '', info: '' });
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState({ lat: 23.8103, lng: 90.4125 });
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Famous locations in Dhaka for search
  const famousLocations = [
    { name: 'National Parliament House', lat: 23.7629, lng: 90.3780 },
    { name: 'Ahsan Manzil', lat: 23.7083, lng: 90.4061 },
    { name: 'Lalbagh Fort', lat: 23.7187, lng: 90.3867 },
    { name: 'Dhaka University', lat: 23.7308, lng: 90.3975 },
    { name: 'Sadarghat', lat: 23.7104, lng: 90.4076 },
    { name: 'Hatirjheel', lat: 23.7536, lng: 90.4067 },
    { name: 'Uttara', lat: 23.8759, lng: 90.3795 },
    { name: 'Mirpur', lat: 23.8223, lng: 90.3654 },
    { name: 'Mohakhali', lat: 23.7808, lng: 90.4039 },
    { name: 'Banani', lat: 23.7937, lng: 90.4066 }
  ];

  const filteredLocations = famousLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Convert lat/lng to pixel coordinates
  const latLngToPixel = (lat, lng, mapWidth = 800, mapHeight = 500) => {
    const latRange = 0.2;
    const lngRange = 0.2;
    
    const x = ((lng - (center.lng - lngRange/2)) / lngRange) * mapWidth;
    const y = (((center.lat + latRange/2) - lat) / latRange) * mapHeight;
    
    return { x, y };
  };

  // Convert pixel to lat/lng
  const pixelToLatLng = (x, y, mapWidth = 800, mapHeight = 500) => {
    const latRange = 0.2;
    const lngRange = 0.2;
    
    const lng = (x / mapWidth) * lngRange + (center.lng - lngRange/2);
    const lat = (center.lat + latRange/2) - (y / mapHeight) * latRange;
    
    return { lat, lng };
  };

  const handleMapClick = (e) => {
    if (!isAddingMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const position = pixelToLatLng(x, y, rect.width, rect.height);
    setClickedPosition(position);
    setMarkerForm({ name: '', info: '' });
    setShowAddModal(true);
    setIsAddingMode(false);
  };

  const handleAddMarker = () => {
    if (markerForm.name.trim() && clickedPosition) {
      const marker = {
        id: Date.now(),
        lat: clickedPosition.lat,
        lng: clickedPosition.lng,
        name: markerForm.name,
        info: markerForm.info
      };
      setMarkers([...markers, marker]);
      setMarkerForm({ name: '', info: '' });
      setClickedPosition(null);
      setShowAddModal(false);
    }
  };

  const handleDeleteMarker = (id) => {
    setMarkers(markers.filter(m => m.id !== id));
    setSelectedMarker(null);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 18));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 3));
  };

  const handleCenterMap = (lat, lng) => {
    setCenter({ lat, lng });
    setSelectedMarker(markers.find(m => m.lat === lat && m.lng === lng));
  };

  const handleSearchLocation = (location) => {
    setCenter({ lat: location.lat, lng: location.lng });
    setSearchQuery('');
  };

  const enableAddMode = () => {
    setIsAddingMode(true);
    setSelectedMarker(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="text-blue-500" size={32} />
            Interactive Map
          </h2>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location..."
                className="w-full md:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              
              {searchQuery && filteredLocations.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filteredLocations.map((loc, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSearchLocation(loc)}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition duration-150"
                    >
                      <div className="font-medium text-sm">{loc.name}</div>
                      <div className="text-xs text-gray-500">{loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={enableAddMode}
              className={`px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2 ${
                isAddingMode 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Plus size={20} />
              {isAddingMode ? 'Click on Map' : 'Add Marker'}
            </button>
          </div>
        </div>

        {isAddingMode && (
          <div className="mb-4 p-3 bg-green-50 border-2 border-green-500 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info size={20} className="text-green-600" />
              <span className="text-green-800 font-medium">Click anywhere on the map to add a marker</span>
            </div>
            <button
              onClick={() => setIsAddingMode(false)}
              className="text-green-600 hover:text-green-800"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="md:col-span-2">
            <div 
              onClick={handleMapClick}
              className={`relative bg-linear-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden shadow-md ${
                isAddingMode ? 'cursor-crosshair ring-4 ring-green-500' : ''
              }`} 
              style={{ height: '500px' }}
            >
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Roads/Streets effect */}
              <svg className="absolute inset-0 opacity-10" width="100%" height="100%">
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="gray" strokeWidth="3"/>
                <line x1="0" y1="60%" x2="100%" y2="60%" stroke="gray" strokeWidth="3"/>
                <line x1="25%" y1="0" x2="25%" y2="100%" stroke="gray" strokeWidth="3"/>
                <line x1="60%" y1="0" x2="60%" y2="100%" stroke="gray" strokeWidth="3"/>
              </svg>

              {/* Markers */}
              {markers.map((marker) => {
                const rect = document?.querySelector('.relative.bg-gradient-to-br')?.getBoundingClientRect();
                const pos = latLngToPixel(marker.lat, marker.lng, rect?.width || 800, rect?.height || 500);
                
                return (
                  <div
                    key={marker.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCenterMap(marker.lat, marker.lng);
                    }}
                    className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-125 z-20"
                    style={{ 
                      left: `${(pos.x / (rect?.width || 800)) * 100}%`, 
                      top: `${(pos.y / (rect?.height || 500)) * 100}%`
                    }}
                  >
                    <MapPin 
                      size={36} 
                      className={`${selectedMarker?.id === marker.id ? 'text-red-500' : 'text-blue-600'} drop-shadow-lg animate-bounce`}
                      fill={selectedMarker?.id === marker.id ? '#ef4444' : '#2563eb'}
                      strokeWidth={2}
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-lg text-xs font-semibold whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {marker.name}
                    </div>
                  </div>
                );
              })}

              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white rounded-lg shadow-lg p-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  className="p-2 hover:bg-gray-100 rounded transition duration-200"
                  title="Zoom In"
                >
                  <Plus size={20} />
                </button>
                <div className="text-center text-sm font-semibold border-y py-1">
                  {zoom}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  className="p-2 hover:bg-gray-100 rounded transition duration-200"
                  title="Zoom Out"
                >
                  <div className="w-5 h-0.5 bg-gray-700"></div>
                </button>
              </div>

              {/* Center Position Indicator */}
              <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg text-xs z-10">
                <div className="font-semibold">Center:</div>
                <div>Lat: {center.lat.toFixed(4)}</div>
                <div>Lng: {center.lng.toFixed(4)}</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Navigation size={20} className="text-blue-500" />
                Markers ({markers.length})
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {markers.map((marker) => (
                  <div
                    key={marker.id}
                    className={`p-3 rounded-lg cursor-pointer transition duration-200 ${
                      selectedMarker?.id === marker.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-white hover:bg-gray-100 border border-gray-200'
                    }`}
                    onClick={() => handleCenterMap(marker.lat, marker.lng)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{marker.name}</div>
                        {marker.info && <div className="text-xs text-gray-600 mt-1">{marker.info}</div>}
                        <div className="text-xs text-gray-400 mt-1">
                          {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMarker(marker.id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1 transition duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedMarker && (
              <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Info size={20} className="text-blue-500" />
                  Selected Location
                </h3>
                <div className="space-y-1 text-sm">
                  <div><span className="font-semibold">Name:</span> {selectedMarker.name}</div>
                  {selectedMarker.info && <div><span className="font-semibold">Info:</span> {selectedMarker.info}</div>}
                  <div><span className="font-semibold">Coordinates:</span> {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Marker Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add New Marker</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setClickedPosition(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {clickedPosition && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                <div className="font-semibold text-gray-700 mb-1">Selected Position:</div>
                <div className="text-gray-600">
                  Lat: {clickedPosition.lat.toFixed(4)}, Lng: {clickedPosition.lng.toFixed(4)}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location Name *
                </label>
                <input
                  type="text"
                  value={markerForm.name}
                  onChange={(e) => setMarkerForm({ ...markerForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., My Office"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Information (Optional)
                </label>
                <textarea
                  value={markerForm.info}
                  onChange={(e) => setMarkerForm({ ...markerForm, info: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional details about this location"
                  rows="3"
                />
              </div>

              <button
                onClick={handleAddMarker}
                disabled={!markerForm.name.trim()}
                className={`w-full py-2 rounded-lg transition duration-200 ${
                  markerForm.name.trim()
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add Marker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;