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
// حط هنا كلمة المرور السرية
// كود عرض التصاميم المضافة تلقائياً في الموقع الرئيسي
window.addEventListener('DOMContentLoaded', () => {
  const designsContainer = document.querySelector('#latest-designs-container'); // حط هنا الـ selector بتاع مكان عرض التصاميم في موقعك
  let savedDesigns = JSON.parse(localStorage.getItem('nabil_designs')) || [];

  if (savedDesigns.length > 0 && designsContainer) {
    savedDesigns.forEach(design => {
      const designCard = `
                <div class="design-card" style="background: #1e293b; padding: 15px; border-radius: 8px; margin: 10px; text-align: right;">
                    <img src="${design.url}" alt="${design.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px;">
                    <h3 style="color: #fff; margin: 10px 0 5px;">${design.title}</h3>
                    <p style="color: #94a3b8; font-size: 0.9rem;">${design.desc || ''}</p>
                </div>
            `;
      designsContainer.innerHTML += designCard;
    });
  }
});