import ProductCard from '@/ui/ProductCard'
import getProducts from '@/lib/action'
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

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="home">
      <div className="container">
        <h1 className="page-title">Nasze Produkty</h1>
        <div className="product-grid">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
