import React, { useState } from 'react';

function Body() {
  const [catImage, setCatImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customText, setCustomText] = useState('');
  const [imageReady, setImageReady] = useState(false);

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
    <div className="container-fluid min-vh-100 bg-light d-flex flex-column justify-content-center align-items-center text-center py-5 px-4">
      <p className="lead text-primary fw-bold mb-4">
        Esta aplicación te permite crear memes de gatos escribiendo un texto personalizado sobre una imagen aleatoria. <br />
        ¡Escribe lo que quieras, genera tu meme gatuno y descárgalo para compartirlo con tus amigos! 🐱✨
      </p>

      {loading && <p className="text-muted">Cargando gato...</p>}
      {error && <p className="text-danger">{error}</p>}

      {catImage && !loading && (
        <img
          src={catImage}
          alt="Gato generado"
          className="img-fluid rounded shadow mb-4"
          style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain' }}
        />
      )}

      {!imageReady && (
        <div className="w-50 d-flex flex-column align-items-center">
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            placeholder="Agrega tu texto aquí"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            maxLength={50}
            disabled={loading}
          />
          <button
            className="btn btn-success btn-lg px-4 py-2 mb-2"
            onClick={fetchCatWithText}
            disabled={loading || !customText.trim()}
          >
            Agregar texto
          </button>
          <small className="form-text text-muted">
            {customText.length}/50 caracteres
          </small>
        </div>
      )}

      {imageReady && !loading && (
        <button
          className="btn btn-warning btn-lg px-4 py-2"
          onClick={downloadImage}
        >
          Descargar imagen 🖼️
        </button>
      )}
    </div>
  );
}

export default Body;
