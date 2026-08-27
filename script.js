document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close');
  const cards = document.querySelectorAll('.portfolio-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.portfolio-img');
      const title = card.querySelector('.card-overlay h3')?.innerText || 'تصميم فوتوشوب';
      const desc = card.querySelector('.card-overlay p')?.innerText || '';

      lightboxImg.src = img.src;
      lightboxTitle.innerText = title;
      lightboxDesc.innerText = desc;

      lightbox.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });

  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
});