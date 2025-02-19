export default async function getProducts() {
  let tokenJWT
  await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'pukaluk.adam505@gmail.com',
      password: 'admin123',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const token = data.token
      console.log('ss', token)
      tokenJWT = token
    })
    .catch((error) => console.error('Error:', error))
  console.log('sasd', tokenJWT)

  const response = await fetch('http://localhost:3000/api/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${await tokenJWT}`,
    },
  })

  if (!response.ok) {
    throw new Error('Błąd pobierania danych')
  }

  const data = await response.json()
  return data.docs
}
