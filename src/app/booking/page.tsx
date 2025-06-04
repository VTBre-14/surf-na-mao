'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function BookingPage() {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">Detalhes da Reserva</h1>

      {/* Booking Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Selecionar Datas e Local</h2>
        
        {/* Date Picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Período de Reserva</label>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Delivery Address (Optional) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Endereço de Entrega (Opcional)</label>
          <input type="text" placeholder="Rua, número, complemento..." className="w-full p-2 border rounded-md" />
        </div>

        {/* Action Button */}
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
          Continuar para Pagamento
        </button>
      </div>

      {/* Order Summary (Will be added later) */}
      {/* <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Resumo do Pedido</h2>
        </div>
      */}
    </div>
  )
} 