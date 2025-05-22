import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/body.css';

function Body() {
  const [catImage, setCatImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customText, setCustomText] = useState('');

  // Función para cargar gato aleatorio sin texto
  const fetchCat = async () => {
    setLoading(true);
    setError('');
    try {
      const timestamp = new Date().getTime(); // Evita caché
      const url = `https://cataas.com/cat?timestamp=${timestamp}`;
      setCatImage(url);
    } catch (err) {
      console.error('Error al cargar el gato:', err);
      setError('No se pudo cargar el gato. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Función para cargar gato con texto
  const fetchCatWithText = async () => {
    if (!customText.trim()) return;
    setLoading(true);
    setError('');
    try {
      const encodedText = encodeURIComponent(customText.trim());
      const response = await axios.get(`https://cataas.com/cat/says/${encodedText}?json=true`);
      const imageUrl = `https://cataas.com${response.data.url}`;
      setCatImage(imageUrl);
    } catch (err) {
      console.error('Error al cargar el gato con texto:', err);
      setError('No se pudo generar el gato con texto. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCat(); // Carga un gato al inicio
  }, []);

  return (
    <div className="container-fluid body-bg d-flex flex-column justify-content-center align-items-center text-center py-5">
      <h1 className="display-5 mb-4 text-primary-custom">¡Mira este gato!</h1>

      {loading && <p className="text-muted">Cargando gato...</p>}
      {error && <p className="text-danger">{error}</p>}

      {catImage && !loading && (
        <img
          src={catImage}
          alt="Gato"
          className="img-fluid rounded shadow mb-4 cat-img"
        />
      )}

      {/* Botón para gato aleatorio */}
      <button
        className="btn btn-primary-custom px-4 py-2 mb-4"
        onClick={fetchCat}
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Otro gato 🐾'}
      </button>

      {/* Campo y botón para agregar texto */}
      <div className="w-75">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Escribe un texto para el gato"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          disabled={loading}
        />
        <button
          className="btn btn-success px-4 py-2"
          onClick={fetchCatWithText}
          disabled={loading || !customText.trim()}
        >
          Generar gato con texto
        </button>
      </div>
    </div>
  );
}

export default Body;
