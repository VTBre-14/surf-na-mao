import Image from 'next/image'
import Link from 'next/link'

interface SchoolCardProps {
  id: string
  name: string
  description: string
  rating: number
  price: number
  imageUrl: string
  languages: string[]
}

export default function SchoolCard({
  id,
  name,
  description,
  rating,
  price,
  imageUrl,
  languages,
}: SchoolCardProps) {
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
        <h3 className="text-xl font-semibold text-blue-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        
        {/* Languages */}
        <div className="flex flex-wrap gap-2 mb-4">
          {languages.map((lang) => (
            <span
              key={lang}
              className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600 ml-2">({rating.toFixed(1)})</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-900">
            R$ {price.toFixed(2)}/aula
          </span>
          <Link
            href={`/schools/${id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            Agendar
          </Link>
        </div>
      </div>
    </div>
  )
} 