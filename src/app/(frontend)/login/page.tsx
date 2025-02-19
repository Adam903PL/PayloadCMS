import { AuthButton } from '@/ui/AuthButton'
import FrontendProducts from '@/ui/FrontendProducts'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="home-layout">
      <div className="home-content">
        <nav className="home-nav">
          <FrontendProducts />
        </nav>
        <AuthButton />
      </div>
    </main>
  )
}
