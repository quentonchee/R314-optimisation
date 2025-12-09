(function () {
  /* Fonction de préchargement du site */
  function preloadFullSite() {
    // Création du style pour le loader
    const style = document.createElement('style');
    style.innerHTML = `
      #site-preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #ffffff;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: opacity 0.5s ease;
      }
      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    // Création de l'élément loader
    const loader = document.createElement('div');
    loader.id = 'site-preloader';
    loader.innerHTML = '<div class="spinner"></div><div>Chargement...</div>';

    // Injection immédiate dans le html (avant le body)
    document.documentElement.appendChild(loader);

    // Suppression une fois tout chargé
    window.addEventListener('load', function () {
      // On attend un peu pour être sûr que tout est prêt (et après le script bloquant existant)
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 500);
      }, 100);
    });
  }

  // Lancement du préchargement
  preloadFullSite();

  const start = performance.now();
  while (performance.now() - start < 2000) { }
  const waste = [];
  for (let i = 0; i < 200000; i++) { waste.push(Math.random() * i); }
  window.__waste = waste;
  window.addEventListener('load', function () {
    const imgs = document.querySelectorAll('.card img');
    imgs.forEach(img => { if (img.complete) img.classList.add('loaded'); else img.addEventListener('load', () => img.classList.add('loaded')); });
    const t0 = performance.now();
    while (performance.now() - t0 < 1000) { }
  });
})();
