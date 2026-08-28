// ملف script.js للموقع الرئيسي
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const emptyMessage = document.getElementById('empty-message');

  const STORAGE_KEY = "nabil_cloud_designs_v2";

  // 1. جلب وعرض التصاميم المحفوظة تلقائياً
  function loadAndRenderPublicDesigns() {
    if (!portfolioGrid) return;

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const designs = data ? JSON.parse(data) : [];

      if (designs.length === 0) {
        if (emptyMessage) emptyMessage.style.display = 'block';
        portfolioGrid.innerHTML = '';
        return;
      }

      if (emptyMessage) emptyMessage.style.display = 'none';
      portfolioGrid.innerHTML = '';

      designs.forEach(design => {
        portfolioGrid.innerHTML += `
                    <div class="portfolio-card" style="background: var(--bg-card, #1e293b); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color, #334155); text-align: right; box-shadow: 0 4px 6px rgba(0,0,0,0.2); cursor: pointer; transition: transform 0.3s;">
                        <img src="${design.url}" alt="${design.title}" class="portfolio-img" style="width: 100%; height: 240px; object-fit: cover;">
                        <div style="padding: 20px;" class="card-overlay">
                            <h3 style="color: var(--text-main, #fff); margin-bottom: 10px; font-size: 1.2rem;">${design.title}</h3>
                            <p style="color: var(--text-muted, #94a3b8); font-size: 0.95rem; line-height: 1.5;">${design.desc || ''}</p>
                        </div>
                    </div>
                `;
      });

      // تفعيل تفاعل الـ Lightbox بعد تحميل الكروت ديناميكياً
      initLightboxEvents();

    } catch (error) {
      console.error("خطأ في قراءة التصاميم:", error);
    }
  }

  // 2. إعدادات الـ Lightbox للصور
  function initLightboxEvents() {
    const cards = document.querySelectorAll('.portfolio-card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.portfolio-img');
        const title = card.querySelector('.card-overlay h3')?.innerText || 'تصميم';
        const desc = card.querySelector('.card-overlay p')?.innerText || '';

        if (lightboxImg && img) lightboxImg.src = img.src;
        if (lightboxTitle) lightboxTitle.innerText = title;
        if (lightboxDesc) lightboxDesc.innerText = desc;

        if (lightbox) lightbox.classList.add('active');
      });
    });
  }

  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });

  // 3. دعم تسجيل الدخول لـ Netlify Identity
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }

  // تنفيذ التحميل عند فتح الصفحة
  loadAndRenderPublicDesigns();
});