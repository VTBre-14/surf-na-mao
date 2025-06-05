'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { SurfSpot } from '@/types/surf-spot';
import { Loader2 } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    initMap?: () => void;
  }
}

export default function SpotsMapPage() {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  const { data: spots, isLoading } = useQuery<SurfSpot[]>({
    queryKey: ['spots'],
    queryFn: () => api.get('/spots').then(res => res.data),
  });

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, []);

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 38.7223, lng: -9.1393 }, // Lisbon coordinates
      zoom: 10,
    });
    setMap(mapInstance);
  };

  useEffect(() => {
    if (map && spots) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      const newMarkers: any[] = [];

      spots.forEach(spot => {
        if (spot.coordinates) {
          const marker = new window.google.maps.Marker({
            position: {
              lat: spot.coordinates.latitude,
              lng: spot.coordinates.longitude,
            },
            map,
            title: spot.name,
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-semibold">${spot.name}</h3>
                <p class="text-sm text-gray-600">${spot.location}</p>
                <p class="text-sm text-gray-600">Difficulty: ${spot.difficulty}</p>
                <p class="text-sm text-gray-600">Type: ${spot.type}</p>
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          newMarkers.push(marker);
        }
      });

      setMarkers(newMarkers);
    }
  }, [map, spots]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div id="map" className="w-full h-[600px] rounded-lg" />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Surf Spots</h2>
          <div className="space-y-4">
            {spots?.map((spot) => (
              <Card key={spot.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{spot.name}</span>
                    <Badge variant={spot.difficulty === 'beginner' ? 'default' : 'secondary'}>
                      {spot.difficulty}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{spot.location}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Type: {spot.type}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 