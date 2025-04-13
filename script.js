// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = 80; // Header yüksekliği için offset
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

// Yazı animasyonu
const typeWriter = (text, element, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Ana sayfa yüklendiğinde yazı animasyonu
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    const originalTitle = heroTitle.textContent;
    const originalText = heroText.textContent;

    heroTitle.textContent = '';
    heroText.style.opacity = '0';

    setTimeout(() => {
        typeWriter(originalTitle, heroTitle, 100);
        setTimeout(() => {
            heroText.style.transition = 'opacity 1s ease';
            heroText.style.opacity = '1';
        }, originalTitle.length * 100 + 500);
    }, 500);
});

// Proje kartları için gelişmiş hover efekti
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const bounds = this.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        this.style.transform = `
            perspective(1000px)
            rotateX(${(mouseY - bounds.height/2) / 20}deg)
            rotateY(${-(mouseX - bounds.width/2) / 20}deg)
            translateY(-10px)
        `;
        
        this.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mousemove', function(e) {
        const bounds = this.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        this.style.transform = `
            perspective(1000px)
            rotateX(${(mouseY - bounds.height/2) / 20}deg)
            rotateY(${-(mouseX - bounds.width/2) / 20}deg)
            translateY(-10px)
        `;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        this.style.transition = 'transform 0.5s ease';
    });
});

// Form gönderimi ve animasyon
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    // Form verilerini al
    const formData = {
        name: form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        message: form.querySelector('textarea').value
    };

    // Gönderme animasyonu
    button.style.width = button.offsetWidth + 'px';
    button.textContent = '⌛';
    button.disabled = true;
    
    // API çağrısını simüle et
    setTimeout(() => {
        console.log('Form verileri:', formData);
        button.textContent = '✓';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            form.reset();
            
            // Başarı mesajı
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Mesajınız başarıyla gönderildi!';
            successMessage.style.cssText = `
                color: #00bfa6;
                text-align: center;
                margin-top: 1rem;
                font-weight: 500;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
            `;
            
            form.appendChild(successMessage);
            requestAnimationFrame(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            });
            
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-20px)';
                setTimeout(() => successMessage.remove(), 300);
            }, 3000);
        }, 1000);
    }, 1500);
});

// Parallax efekti (performans iyileştirmesi)
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const sections = document.querySelectorAll('section:not(#contact)'); // Contact bölümü hariç
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const speed = section.dataset.speed || 0.2;
                    const yPos = (scrolled * speed) * 0.5;
                    section.style.transform = `translateY(${yPos}px)`;
                }
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Header scroll efektini kaldırdık 