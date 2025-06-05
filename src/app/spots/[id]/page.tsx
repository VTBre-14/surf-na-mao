'use client';

import { useQuery } from '@tanstack/react-query';
import { MapPin, Wind, Waves, Clock, AlertTriangle, Coffee, Parking, Shower } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { SurfSpot } from '@/types/surf-spot';
import Image from 'next/image';

export default function SpotDetailPage({ params }: { params: { id: string } }) {
  const { data: spot, isLoading } = useQuery<SurfSpot>({
    queryKey: ['spots', params.id],
    queryFn: () => api.get(`/spots/${params.id}`).then(res => res.data),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!spot) {
    return <div>Spot not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {spot.imageUrl && (
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={spot.imageUrl}
                alt={spot.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{spot.name}</span>
                <Badge variant={spot.difficulty === 'beginner' ? 'default' : 'secondary'}>
                  {spot.difficulty}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{spot.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Waves className="w-4 h-4 mr-2" />
                <span>{spot.type}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Wind className="w-4 h-4 mr-2" />
                <span>Best wind: {spot.bestWind}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                <span>Best tide: {spot.bestTide}</span>
              </div>
              {spot.description && (
                <p className="text-muted-foreground">{spot.description}</p>
              )}
            </CardContent>
          </Card>

          {spot.hazards && spot.hazards.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                  Hazards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {spot.hazards.map((hazard, index) => (
                    <li key={index} className="text-muted-foreground">{hazard}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {spot.amenities && spot.amenities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {spot.amenities.includes('parking') && (
                    <div className="flex items-center text-muted-foreground">
                      <Parking className="w-4 h-4 mr-2" />
                      <span>Parking</span>
                    </div>
                  )}
                  {spot.amenities.includes('showers') && (
                    <div className="flex items-center text-muted-foreground">
                      <Shower className="w-4 h-4 mr-2" />
                      <span>Showers</span>
                    </div>
                  )}
                  {spot.amenities.includes('cafe') && (
                    <div className="flex items-center text-muted-foreground">
                      <Coffee className="w-4 h-4 mr-2" />
                      <span>Café</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {spot.coordinates && (
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-muted rounded-lg">
                  {/* Add map component here */}
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Latitude: {spot.coordinates.latitude}</p>
                  <p>Longitude: {spot.coordinates.longitude}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Button className="w-full">Book a Lesson Here</Button>
        </div>
      </div>
    </div>
  );
} 