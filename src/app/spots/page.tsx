'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Wind, Waves, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { SurfSpot } from '@/types/surf-spot';

export default function SpotsPage() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [type, setType] = useState<string>('all');

  const { data: spots, isLoading } = useQuery<SurfSpot[]>({
    queryKey: ['spots'],
    queryFn: () => api.get('/spots').then(res => res.data),
  });

  const filteredSpots = spots?.filter(spot => {
    const matchesSearch = spot.name.toLowerCase().includes(search.toLowerCase()) ||
      spot.location.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficulty === 'all' || spot.difficulty === difficulty;
    const matchesType = type === 'all' || spot.type === type;
    return matchesSearch && matchesDifficulty && matchesType;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Surf Spots</h1>
        <Button>Add New Spot</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder="Search spots..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Wave Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="beach">Beach Break</SelectItem>
            <SelectItem value="reef">Reef Break</SelectItem>
            <SelectItem value="point">Point Break</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots?.map((spot) => (
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
              <div className="space-y-4">
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
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 