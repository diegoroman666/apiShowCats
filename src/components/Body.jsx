import React, { useState } from 'react';
import '../styles/body.css';

function Body() {
  const [catImage, setCatImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customText, setCustomText] = useState('');
  const [imageReady, setImageReady] = useState(false);

  // Obtener imagen aleatoria
  const fetchCat = async () => {
    setLoading(true);
    setError('');
    setImageReady(false);
    try {
      const timestamp = new Date().getTime();
      const catUrl = `https://cataas.com/cat?timestamp=${timestamp}`;
      setCatImage(catUrl);
    } catch (err) {
      console.error('Error al cargar el gato:', err);
      setError('No se pudo cargar el gato. Intenta nuevamente.');
    } finally {
      setLoading(false);
      setImageReady(true);
    }
  };

  // Obtener imagen con texto
  const fetchCatWithText = async () => {
    if (!customText.trim()) return;
    setLoading(true);
    setError('');
    setImageReady(false);
    try {
      const encodedText = encodeURIComponent(customText.trim());
      const catWithTextUrl = `https://cataas.com/cat/says/${encodedText}?size=50&color=white&timestamp=${new Date().getTime()}`;
      setCatImage(catWithTextUrl);
    } catch (err) {
      console.error('Error al cargar el gato con texto:', err);
      setError('No se pudo agregar el texto. Intenta nuevamente.');
    } finally {
      setLoading(false);
      setImageReady(true);
    }
  };

  // Descargar la imagen
  const downloadImage = async () => {
    try {
      const response = await fetch(catImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'gato.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setImageReady(false);
      setCustomText('');
      setCatImage('');
    } catch (err) {
      console.error('Error al descargar la imagen:', err);
      setError('No se pudo descargar la imagen.');
    }
  };

  return (
    <div className="container-fluid body-bg d-flex flex-column justify-content-center align-items-center text-center py-5">
      <h1 className="display-5 mb-4 text-primary-custom">¡Mira este gato!</h1>

      {loading && <p className="text-muted">Cargando gato...</p>}
      {error && <p className="text-danger">{error}</p>}

      {catImage && !loading && (
        <img
          src={catImage}
          alt="Gato generado"
          className="img-fluid rounded shadow mb-4 cat-img"
        />
      )}

      {!imageReady && (
        <>
          <button
            className="btn btn-primary-custom px-4 py-2 mb-3"
            onClick={fetchCat}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Otro gato 🐾'}
          </button>

          <div className="w-50 d-flex flex-column align-items-center">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Agrega tu texto aquí"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              maxLength={50}
              disabled={loading}
            />
            <button
              className="btn btn-success px-4 py-2 mb-2"
              onClick={fetchCatWithText}
              disabled={loading || !customText.trim()}
            >
              Agregar texto
            </button>
            <small className="form-text text-muted">
              {customText.length}/50 caracteres
            </small>
          </div>
        </>
      )}

      {imageReady && !loading && (
        <button
          className="btn btn-warning px-4 py-2"
          onClick={downloadImage}
        >
          Descargar imagen 🖼️
        </button>
      )}
    </div>
  );
}

export default Body;
