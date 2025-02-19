export default async function getProducts() {
  const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL

  // 1. Przenieś logowanie do osobnej funkcji
  const getAuthToken = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD
        }),
      })

      if (!response.ok) throw new Error('Login failed')
      const { token } = await response.json()
      return token
    } catch (error) {
      console.error('Authentication error:', error)
      return null
    }
  }

  // 2. Pobierz token
  const token = await getAuthToken()
  if (!token) throw new Error('Authentication failed')

  // 3. Pobierz produkty z tokenem
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      next: { revalidate: 60 } // ISR dla Next.js
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const { docs } = await response.json()
    return docs
  } catch (error) {
    console.error('Fetch products error:', error)
    throw new Error('Failed to fetch products')
  }
}