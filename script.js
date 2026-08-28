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
const CORRECT_PASSWORD = "nabil123"; // تقدر تغيرها زي ما تحب

function checkPassword() {
  const pass = document.getElementById('adminPassword').value;
  const errorText = document.getElementById('login-error');

  if (pass === CORRECT_PASSWORD) {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('admin-panel').classList.remove('hidden');
  } else {
    errorText.innerText = 'كلمة المرور غير صحيحة، حاول مرة أخرى.';
  }
}

async function uploadDesign() {
  const title = document.getElementById('designTitle').value;
  const desc = document.getElementById('designDesc').value;
  const fileInput = document.getElementById('designImage');
  const status = document.getElementById('status');

  if (!title || fileInput.files.length === 0) {
    alert('من فضلك اكتب العنوان واختر الصورة!');
    return;
  }

  status.innerText = 'جاري رفع الصورة ونشرها... ⏳';

  const formData = new FormData();
  formData.append('image', fileInput.files[0]);

  try {
    const response = - await fetch('https://api.imgbb.com/1/upload?key=6d207e021577759247d519d08e709e99', {
      method: 'POST',
      body: formData
    });

    // استبدل علامة الناقص (-) الزائدة بالطلب الصحيح لو نسختها، الخط اللي تحت هو الصح:
    // const response = await fetch(...);

    // تعديل الطلب الصحيح للـ API:
    const res = await fetch('https://api.imgbb.com/1/upload?key=6d207e021577759247d519d08e709e99', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();

    if (data.success) {
      const imageUrl = data.data.url;
      let designs = JSON.parse(localStorage.getItem('nabil_designs')) || [];

      designs.unshift({ title, desc, url: imageUrl });
      localStorage.setItem('nabil_designs', JSON.stringify(designs));

      status.innerText = 'تم النشر بنجاح! 🎉 حدد صفحة الموقع الرئيسية لرؤية التغيير.';
      document.getElementById('designTitle').value = '';
      document.getElementById('designDesc').value = '';
      fileInput.value = '';
    } else {
      status.innerText = 'فشل الرفع، حاول مرة أخرى.';
    }
  } catch (error) {
    status.innerText = 'حدث خطأ في الاتصال.';
    console.error(error);
  }
}