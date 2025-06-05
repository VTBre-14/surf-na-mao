'use client'

import { useState, useEffect } from 'react'
import { prisma } from "@/lib/prisma";
import { SchoolCard } from "@/components/school-card";

interface School {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  images: string[];
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
  }>;
}

export default async function SchoolsPage() {
  const schools = await prisma.school.findMany({
    include: {
      reviews: true,
    },
    orderBy: {
      reviews: {
        _count: "desc",
      },
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Surf Schools</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-md">
            <option value="">All Locations</option>
            <option value="lisbon">Lisbon</option>
            <option value="porto">Porto</option>
            <option value="algarve">Algarve</option>
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="reviews">Most Reviews</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schools.map((school: School) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    </div>
  );
} 