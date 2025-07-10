function downloadCV() {
  try {
    // Create a link element
    const link = document.createElement('a');
    
    // Set the file path - encode the URL to handle spaces in filename
    const filePath = 'assets/HARSH BHAYANI ORG RESUME.pdf';
    link.href = encodeURI(filePath);
    
    // Set the download attribute with a clean filename
    link.download = 'Harsh_Bhayani_Resume.pdf';
    
    // Set link properties for better compatibility
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show success message
    console.log('CV download initiated successfully');
    
  } catch (error) {
    console.error('Error downloading CV:', error);
    // Fallback: Open in new tab if download fails
    window.open('assets/HARSH BHAYANI ORG RESUME.pdf', '_blank');
  }
}

// Hero right icon switcher
window.addEventListener('DOMContentLoaded', function() {
  const rightIcons = document.querySelector('.hero-right-icons');
  if (!rightIcons) return;
  const icons = rightIcons.querySelectorAll('.hero-icon-switch');
  let current = 0;
  icons.forEach((icon, i) => icon.classList.toggle('active', i === 0));
  setInterval(() => {
    icons[current].classList.remove('active');
    current = (current + 1) % icons.length;
    icons[current].classList.add('active');
  }, 3000);
});

// Hamburger menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open', navLinks.classList.contains('open'));
  });
  // Close menu on link click (for SPA feel)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

// Advanced Project Slider
(function() {
  const slider = document.querySelector('.project-slider');
  if (!slider) return;
  const track = slider.querySelector('.project-slider-track');
  const slides = Array.from(slider.querySelectorAll('.project-slide'));
  const leftArrow = slider.querySelector('.slider-arrow-left');
  const rightArrow = slider.querySelector('.slider-arrow-right');
  const dotsContainer = slider.querySelector('.slider-dots');
  let current = 0;
  let autoSlideInterval;
  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i+1));
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);
  function updateSlider() {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    track.style.transform = `translateX(-${current * 100}%)`;
  }
  function goToSlide(idx) {
    current = (idx + slides.length) % slides.length;
    updateSlider();
    resetAutoSlide();
  }
  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }
  leftArrow.addEventListener('click', prevSlide);
  rightArrow.addEventListener('click', nextSlide);
  // Auto-slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3500);
  }
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
  slider.addEventListener('touchstart', stopAutoSlide);
  slider.addEventListener('touchend', startAutoSlide);
  // Init
  updateSlider();
  startAutoSlide();
})();

// View Full Image Modal logic
(function() {
  const modal = document.getElementById('fullImageModal');
  const modalImg = document.getElementById('fullImageModalImg');
  const closeBtn = document.querySelector('.full-image-close');
  const overlay = document.querySelector('.full-image-modal-overlay');
  document.querySelectorAll('.view-full-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const imgSrc = btn.getAttribute('data-img');
      modalImg.src = imgSrc;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeModal() {
    modal.classList.remove('open');
    modalImg.src = '';
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  // ESC key closes modal
  window.addEventListener('keydown', function(e) {
    if (modal.classList.contains('open') && e.key === 'Escape') closeModal();
  });
})();
