import React, { useState, useEffect } from 'react';
import '../styles/body.css'; // Estilos personalizados

function Body() {
  const [catImage, setCatImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCat = async () => {
  setLoading(true);
  setError('');
  try {
    // Esta URL entrega directamente una imagen, no JSON
    const catUrl = 'https://cataas.com/cat?timestamp=' + new Date().getTime(); // evita caché
    setCatImage(catUrl);
  } catch (err) {
    console.error('Error al cargar el gato:', err);
    setError('No se pudo cargar el gato. Intenta nuevamente.');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="container-fluid body-bg d-flex flex-column justify-content-center align-items-center text-center py-5">
      <h1 className="display-5 mb-4 text-primary-custom">¡Mira este gato!</h1>

      {loading && <p className="text-muted">Cargando gato...</p>}
      {error && <p className="text-danger">{error}</p>}

      {catImage && !loading && (
        <img
          src={catImage}
          alt="Gato aleatorio"
          className="img-fluid rounded shadow mb-4 cat-img"
        />
      )}

      <button
        className="btn btn-primary-custom px-4 py-2"
        onClick={fetchCat}
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Otro gato 🐾'}
      </button>
    </div>
  );
}

export default Body;
