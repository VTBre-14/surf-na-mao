'use client'

import { useState, useEffect } from 'react'
import { boards as allBoards } from '@/lib/mockData'
import BoardCard from '@/components/boards/BoardCard'

export default function BoardsPage() {
  const [filteredBoards, setFilteredBoards] = useState(allBoards)
  const [filters, setFilters] = useState({
    type: 'Todas',
    leash: 'Todos',
    fins: 'Todos',
  })

  useEffect(() => {
    let updatedBoards = allBoards

    if (filters.type !== 'Todas') {
      updatedBoards = updatedBoards.filter(
        (board) => board.type === filters.type
      )
    }

    if (filters.leash !== 'Todos') {
      // We'll implement leash filtering logic here later when we add this data to mockData
      // For now, this filter won't do anything.
    }

    if (filters.fins !== 'Todos') {
      // We'll implement fins filtering logic here later when we add this data to mockData
      // For now, this filter won't do anything.
    }

    setFilteredBoards(updatedBoards)
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
      <h1 className="text-4xl font-bold text-blue-900 mb-8">Pranchas Disponíveis</h1>
      
      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Prancha
            </label>
            <select
              id="type"
              name="type"
              className="w-full p-2 border rounded-md"
              onChange={handleFilterChange}
              value={filters.type}
            >
              <option>Todas</option>
              <option>Longboard</option>
              <option>Shortboard</option>
              <option>Funboard</option>
              <option>Fish</option>
              <option>Softboard</option>
              <option>Gun</option>
              <option>SUP</option>
            </select>
          </div>
          <div>
            <label htmlFor="leash" className="block text-sm font-medium text-gray-700 mb-2">
              Leash
            </label>
            <select
              id="leash"
              name="leash"
              className="w-full p-2 border rounded-md"
              onChange={handleFilterChange}
              value={filters.leash}
            >
              <option>Todos</option>
              <option>Regular</option>
              <option>Coil</option>
              <option>Big Wave</option>
            </select>
          </div>
          <div>
            <label htmlFor="fins" className="block text-sm font-medium text-gray-700 mb-2">
              Fins
            </label>
            <select
              id="fins"
              name="fins"
              className="w-full p-2 border rounded-md"
              onChange={handleFilterChange}
              value={filters.fins}
            >
              <option>Todos</option>
              <option>Single</option>
              <option>Twin</option>
              <option>Thruster</option>
              <option>Quad</option>
              <option>5-Fin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBoards.map((board) => (
          <BoardCard key={board.id} {...board} />
        ))}
      </div>
    </div>
  )
} 