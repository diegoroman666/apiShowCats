import React from 'react';
import '../styles/footer.css'; // Donde esté la clase .bg-custom

function Footer() {
  return (
    <footer className="bg-custom text-white text-center fixed-bottom py-2 z-1">
      <div className="container">
        <p className="mb-0 fs-6">© 2025 apishowcats. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
