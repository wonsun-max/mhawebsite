'use client';

import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';

const containerStyle = {
    width: '100%',
    height: '100%',
};

interface GoogleMapProps {
    lat: number;
    lng: number;
}

// Premium Dark Map Style
const darkStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
];

const GoogleMapComponent = ({ lat, lng }: GoogleMapProps) => {
    const center = { lat, lng };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    if (!isLoaded) {
        return (
            <div className="w-full h-full bg-white/5 backdrop-blur-xl flex items-center justify-center rounded-2xl border border-white/10 overflow-hidden">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mx-auto"></div>
                    <p className="text-white/60 font-medium">지도를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={17}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    styles: darkStyle,
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: true,
                }}
            >
                <Marker
                    position={center}
                    onClick={() => setShowInfo(true)}
                    title="Manila Hankuk Academy"
                    icon={{
                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }}
                />

                <AnimatePresence>
                    {showInfo && (
                        <InfoWindow
                            position={center}
                            onCloseClick={() => setShowInfo(false)}
                        >
                            <div className="p-2 min-w-[200px] text-gray-900">
                                <h3 className="font-bold text-lg mb-1">Manila Hankuk Academy</h3>
                                <p className="text-sm text-gray-600">마닐라 한국 아카데미</p>
                                <div className="mt-2 text-xs text-gray-500">
                                    B3&4 Lot 1 C. Lawis St. Brgy San Luis, Antipolo City
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </AnimatePresence>
            </GoogleMap>
        </div>
    );
};

export default React.memo(GoogleMapComponent);
