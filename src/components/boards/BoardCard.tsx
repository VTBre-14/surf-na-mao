import Image from 'next/image'
import Link from 'next/link'

interface BoardCardProps {
  id: string
  name: string
  type: string
  description: string
  price: number
  imageUrl: string
}

export default function BoardCard({
  id,
  name,
  type,
  description,
  price,
  imageUrl,
}: BoardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-blue-900">{name}</h3>
          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {type}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-900">
            R$ {price.toFixed(2)}/dia
          </span>
          <Link
            href={`/boards/${id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            Alugar
          </Link>
        </div>
      </div>
    </div>
  )
} 