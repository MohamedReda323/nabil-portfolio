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
// كود عرض الحذف والرفع المباشر من الـ LocalStorage لموقع نبيل بورتفوليو
// كود جلب التصاميم سحابياً وعرضها لكل الزوار في الموقع الأساسي
document.addEventListener('DOMContentLoaded', async () => {
  const portfolioGrid = document.getElementById('portfolio-grid');
  const emptyMessage = document.getElementById('empty-message');

  if (!portfolioGrid) return;

  const BIN_ID = "6a90da54f5f4af5e294bdd8f";
  const API_KEY = "$2a$10$4wACAkCehi/kP0C.y2pnZO01Awruy6s95q/NLDwvyobT0nZCoaFu";

  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: { 'X-Master-Key': API_KEY }
    });
    const data = await res.json();
    let savedDesigns = data.record || [];

    if (savedDesigns.length === 0) {
      if (emptyMessage) emptyMessage.style.display = 'block';
      portfolioGrid.innerHTML = '';
      return;
    }

    if (emptyMessage) emptyMessage.style.display = 'none';
    portfolioGrid.innerHTML = '';

    savedDesigns.forEach(design => {
      portfolioGrid.innerHTML += `
                <div class="portfolio-card" style="background: var(--bg-card, #1e293b); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color, #334155); text-align: right; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
                    <img src="${design.url}" alt="${design.title}" style="width: 100%; height: 240px; object-fit: cover;">
                    <div style="padding: 20px;">
                        <h3 style="color: var(--text-main, #fff); margin-bottom: 10px; font-size: 1.2rem;">${design.title}</h3>
                        <p style="color: var(--text-muted, #94a3b8); font-size: 0.95rem; line-height: 1.5;">${design.desc || ''}</p>
                    </div>
                </div>
            `;
    });
  } catch (error) {
    console.error("خطأ في جلب التصاميم من السحابة:", error);
  }
});