// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const headerOffset = 80;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Intersection Observer ile scroll animasyonları
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '-50px'
});

document.querySelectorAll('section').forEach((section) => {
  observer.observe(section);
});

// Form gönderimi
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);
    
    try {
      submitButton.disabled = true;
      submitButton.textContent = 'Gönderiliyor...';
      
      // Supabase entegrasyonu buraya eklenecek
      
      contactForm.reset();
      submitButton.textContent = 'Gönderildi!';
      setTimeout(() => {
        submitButton.textContent = 'Gönder';
        submitButton.disabled = false;
      }, 3000);
    } catch (error) {
      console.error('Form gönderimi başarısız:', error);
      submitButton.textContent = 'Hata! Tekrar deneyin';
      submitButton.disabled = false;
    }
  });
}

// Proje kartları için hover efekti
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
}); 