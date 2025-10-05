"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface Competition {
  id: number;
  name: string;
  location: string;
  coordinates?: [number, number];
  link: string;
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

export default function MapView({ competitions }: { competitions: Competition[] }) {
  return (
    <div className="h-[500px] w-full mt-8">
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {competitions
          .filter((c) => c.coordinates)
          .map((comp) => (
            <Marker
              key={comp.id}
              position={comp.coordinates as [number, number]}
              icon={defaultIcon} // ✅ now the icon is guaranteed to be defined
            >
              <Popup>
                <strong>{comp.name}</strong>
                <br />
                {comp.location}
                <br />
                <a href={comp.link} target="_blank" rel="noopener noreferrer">
                  Apply
                </a>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
