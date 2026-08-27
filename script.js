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
// تحميل التصاميم المضافة من لوحة التحكم وعرضها في الموقع
document.addEventListener('DOMContentLoaded', () => {
  const portfolioGrid = document.getElementById('portfolio-grid');
  const emptyMessage = document.getElementById('empty-message');

  // جلب التصاميم المحفوظة محلياً (أو يمكن ربطها بقاعدة بيانات لاحقاً)
  let savedDesigns = JSON.parse(localStorage.getItem('nabil_designs')) || [];

  if (savedDesigns.length > 0 && portfolioGrid) {
    if (emptyMessage) emptyMessage.style.display = 'none';

    savedDesigns.forEach(item => {
      const card = document.createElement('div');
      card.className = 'portfolio-card';
      card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${item.url}" alt="${item.title}" class="portfolio-img">
                    <div class="card-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.desc || ''}</p>
                        <button class="view-btn">عرض التصميم</button>
                    </div>
                </div>
            `;
      portfolioGrid.appendChild(card);
    });
  }
});