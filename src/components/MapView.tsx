"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Haversine formula for distance (in miles)
function getDistanceFromLatLonInMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Radius of Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface Competition {
  id: number;
  name: string;
  location: string;
  coordinates?: [number, number];
  link: string;
  prize?: string;
}

const defaultIcon = L.icon({
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const userIcon = L.icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
});

export default function MapView({ competitions }: { competitions: Competition[] }) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [distances, setDistances] = useState<Record<number, number>>({});

  useEffect(() => {
    // Get user’s current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);

          // Calculate distances
          const distObj: Record<number, number> = {};
          competitions.forEach((c) => {
            if (c.coordinates) {
              distObj[c.id] = getDistanceFromLatLonInMiles(
                coords[0],
                coords[1],
                c.coordinates[0],
                c.coordinates[1]
              );
            }
          });
          setDistances(distObj);
        },
        () => console.warn("User location permission denied.")
      );
    }
  }, [competitions]);

  return (
    <div className="h-[500px] w-full mt-8 rounded-xl overflow-hidden">
      <MapContainer
        center={userLocation || [39.8283, -98.5795]} // Default: center of U.S.
        zoom={userLocation ? 6 : 4}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* 🔵 User Location Marker */}
        {userLocation && (
          <>
            <Marker position={userLocation} icon={userIcon}>
              <Popup>
                <strong>Your Location</strong>
              </Popup>
            </Marker>
          </>
        )}

        {/* 📍 Competition Markers */}
        {competitions
          .filter((c) => c.coordinates)
          .map((comp) => (
            <Marker key={comp.id} position={comp.coordinates as [number, number]} icon={defaultIcon}>
              <Popup>
                <strong>{comp.name}</strong>
                <br />
                📍 {comp.location}
                <br />
                💰 <strong>{comp.prize || "Prize not listed"}</strong>
                {userLocation && distances[comp.id] && (
                  <>
                    <br />
                    📏 {distances[comp.id].toFixed(1)} miles away
                  </>
                )}
                <br />
                <a
                  href={comp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Apply
                </a>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
