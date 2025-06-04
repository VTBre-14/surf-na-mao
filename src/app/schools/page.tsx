'use client'

import { useState, useEffect } from 'react'
import { schools as allSchools } from '@/lib/mockData'
import SchoolCard from '@/components/schools/SchoolCard'

export default function SchoolsPage() {
  const [filteredSchools, setFilteredSchools] = useState(allSchools)
  const [filters, setFilters] = useState({
    level: 'Todos',
    languages: 'Todos',
    availability: 'Hoje', // Default to 'Hoje'
    rating: 'Todas',
  })

  useEffect(() => {
    let updatedSchools = allSchools

    // Filter by Level
    if (filters.level !== 'Todos') {
      // We'll need to add level data to mockData or implement this later
    }

    // Filter by Languages
    if (filters.languages !== 'Todos') {
       updatedSchools = updatedSchools.filter((school) =>
        school.languages.includes(filters.languages)
       )
    }

    // Filter by Availability
    if (filters.availability !== 'Hoje') {
      // Implement availability filtering logic later
    }

    // Filter by Rating
    if (filters.rating !== 'Todas') {
      const minRating = parseFloat(filters.rating.split('+')[0])
      updatedSchools = updatedSchools.filter(
        (school) => school.rating >= minRating
      )
    }

    setFilteredSchools(updatedSchools)
  }, [filters])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">Escolas e Instrutores</h1>
      
      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
              Nível
            </label>
            <select
              id="level"
              name="level"
              className="w-full p-2 border rounded-md"
              onChange={handleFilterChange}
              value={filters.level}
            >
              <option>Todos</option>
              <option>Iniciante</option>
              <option>Intermediário</option>
              <option>Avançado</option>
            </select>
          </div>
          <div>
            <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">
              Idiomas
            </label>
            <select
              id="languages"
              name="languages"
              className="w-full p-2 border rounded-md"
              onChange={handleFilterChange}
              value={filters.languages}
            >
              <option>Todos</option>
              <option>Português</option>
              <option>Inglês</option>
              <option>Espanhol</option>
            </select>
          </div>
          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
              Disponibilidade
            </label>
            <select
              id="availability"
              name="availability"
              className="w-full p-2 border rounded-md"
              onChange={handleFilterChange}
              value={filters.availability}
            >
              <option>Hoje</option>
              <option>Amanhã</option>
              <option>Esta Semana</option>
            </select>
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
              Avaliação
            </label>
            <select
              id="rating"
              name="rating"
              className="w-full p-2 border rounded-md"
              onChange={handleFilterChange}
              value={filters.rating}
            >
              <option>Todas</option>
              <option>4+ estrelas</option>
              <option>3+ estrelas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schools/Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <SchoolCard key={school.id} {...school} />
        ))}
      </div>
    </div>
  )
} 