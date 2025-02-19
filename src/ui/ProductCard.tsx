import Image from 'next/image'
import '@/app/(frontend)/style.css'

interface Product {
  id: number
  title: string
  price: number
  updatedAt: string
  createdAt: string
  featuredImage: {
    url: string
    alt: string
  }
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.alt}
          width={300}
          height={200}
          className="product-image"
        />
      </div>
      <div className="product-content">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">Cena: {product.price} zł</p>
        <div className="product-dates">
          <p>Utworzono: {formatDate(product.createdAt)}</p>
          <p>Aktualizowano: {formatDate(product.updatedAt)}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
