export type SurfSpot = {
  id: string;
  name: string;
  location: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'beach' | 'reef' | 'point';
  bestWind: string;
  bestTide: string;
  description?: string;
  imageUrl?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  amenities?: string[];
  hazards?: string[];
  createdAt: string;
  updatedAt: string;
}; 