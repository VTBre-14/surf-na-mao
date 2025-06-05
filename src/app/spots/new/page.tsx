'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { SurfSpot } from '@/types/surf-spot';

const spotSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  type: z.enum(['beach', 'reef', 'point']),
  bestWind: z.string().min(1, 'Best wind direction is required'),
  bestTide: z.string().min(1, 'Best tide is required'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
  amenities: z.array(z.string()).optional(),
  hazards: z.array(z.string()).optional(),
});

type SpotFormData = z.infer<typeof spotSchema>;

export default function NewSpotPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SpotFormData>({
    resolver: zodResolver(spotSchema),
  });

  const onSubmit = async (data: SpotFormData) => {
    try {
      setIsSubmitting(true);
      await api.post('/spots', data);
      router.push('/spots');
    } catch (error) {
      console.error('Error creating spot:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Surf Spot</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  {...register('location')}
                  error={errors.location?.message}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="difficulty" className="text-sm font-medium">
                  Difficulty
                </label>
                <Select onValueChange={(value) => register('difficulty').onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                {errors.difficulty && (
                  <p className="text-sm text-red-500">{errors.difficulty.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Wave Type
                </label>
                <Select onValueChange={(value) => register('type').onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beach">Beach Break</SelectItem>
                    <SelectItem value="reef">Reef Break</SelectItem>
                    <SelectItem value="point">Point Break</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="bestWind" className="text-sm font-medium">
                  Best Wind
                </label>
                <Input
                  id="bestWind"
                  {...register('bestWind')}
                  error={errors.bestWind?.message}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bestTide" className="text-sm font-medium">
                  Best Tide
                </label>
                <Input
                  id="bestTide"
                  {...register('bestTide')}
                  error={errors.bestTide?.message}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                {...register('description')}
                error={errors.description?.message}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="imageUrl"
                type="url"
                {...register('imageUrl')}
                error={errors.imageUrl?.message}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Spot'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 