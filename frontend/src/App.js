import React, { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState('');

  // Aquí puedes obtener el token desde el almacenamiento local o desde tu backend después de la autenticación
  // Por ejemplo, usando useEffect para obtenerlo al cargar la página
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Cambia 'token' por el nombre de tu clave de almacenamiento
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function fetchData() {
    const apiUrl = 'http://localhost:8000/api/data'; // URL del endpoint protegido en el backend

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // Incluye el token en el encabezado 'Authorization' usando el prefijo 'Bearer'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Aquí procesas los datos que recibes desde el backend
      console.log('Data received:', data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }

  return (
    <div>
      <button onClick={fetchData}>Obtener Datos Protegidos</button>
    </div>
  );
}

export default App;
