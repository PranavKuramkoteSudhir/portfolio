// Function to toggle the hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Typing effect
document.addEventListener('DOMContentLoaded', function() {
  const typingElement = document.getElementById('typing-text');
  const cursorElement = document.querySelector('.cursor');
  
  const textLines = [
    "Hello, I'm",
    "Pranav Kuramkote Sudhir",
    "I specialize in Backend development, Data Science, and MLOps"
  ];
  
  let lineIndex = 0;
  let charIndex = 0;

  function typeText() {
    if (lineIndex < textLines.length) {
      if (charIndex < textLines[lineIndex].length) {
        if (charIndex === 0) {
          // Start a new line
          typingElement.innerHTML += `<div class="typed-line"></div>`;
        }
        // Add character to the current line
        const currentLine = typingElement.lastElementChild;
        currentLine.innerHTML += textLines[lineIndex][charIndex];
        charIndex++;
        updateCursorPosition();
        setTimeout(typeText, 50);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeText, 500);
      }
    } else {
      // Typing is complete
      setTimeout(() => {
        cursorElement.style.display = 'none';
      }, 1500);
    }
  }

  function updateCursorPosition() {
    const currentLine = typingElement.lastElementChild;
    if (currentLine) {
      const dummySpan = document.createElement('span');
      dummySpan.style.visibility = 'hidden';
      dummySpan.textContent = '|';
      currentLine.appendChild(dummySpan);

      const rect = dummySpan.getBoundingClientRect();
      const containerRect = typingElement.getBoundingClientRect();

      cursorElement.style.top = `${rect.top - containerRect.top}px`;
      cursorElement.style.left = `${rect.left - containerRect.left}px`;
      cursorElement.style.height = `${rect.height}px`;

      currentLine.removeChild(dummySpan);
    }
  }

  typeText();
});

// Floating Symbols
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('floating-symbols-container');
  const symbols = ['∑', '∫', '∂', 'π', '√', '∞', 'θ', 'λ', 'μ', 'σ', 'Ω'];
  const numSymbols = 20;

  function createSymbol() {
    const symbol = document.createElement('div');
    symbol.classList.add('floating-symbol');
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = `${Math.random() * 100}%`;
    symbol.style.top = `${Math.random() * 100}%`;
    container.appendChild(symbol);

    const speed = 0.5 + Math.random() * 1.5;
    const angle = Math.random() * Math.PI * 2;
    let x = parseFloat(symbol.style.left);
    let y = parseFloat(symbol.style.top);

    function animate() {
      x += speed * Math.cos(angle) * 0.1;
      y += speed * Math.sin(angle) * 0.1;

      if (x < 0) x = 100;
      if (x > 100) x = 0;
      if (y < 0) y = 100;
      if (y > 100) y = 0;

      symbol.style.left = `${x}%`;
      symbol.style.top = `${y}%`;

      requestAnimationFrame(animate);
    }

    animate();
  }

  for (let i = 0; i < numSymbols; i++) {
    createSymbol();
  }
});

// Project Carousel functionality
let currentSlide = 0;
let autoPlayInterval;
let isAutoPlaying = true;

document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.project-card');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  function updateCarousel() {
    // Calculate number of visible slides based on screen width
    let slidesPerView = 3;
    if (window.innerWidth <= 1200) slidesPerView = 2;
    if (window.innerWidth <= 768) slidesPerView = 1;

    // Calculate slide width based on visible slides
    const slideWidth = 100 / slidesPerView;
    
    // Update slides width
    slides.forEach(slide => {
      slide.style.minWidth = `${slideWidth}%`;
    });

    // Update track position
    track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === Math.floor(currentSlide));
    });
  }

  // Initialize carousel
  updateCarousel();

  // Window resize handler
  window.addEventListener('resize', updateCarousel);

  // Add click handlers for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
      resetAutoPlay();
    });
  });

  // Auto-play functionality
  function startAutoPlay() {
    if (!isAutoPlaying) return;
    autoPlayInterval = setInterval(() => {
      moveCarousel(1);
    }, 5000); // Change slides every 5 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  function resetAutoPlay() {
    stopAutoPlay();
    if (isAutoPlaying) {
      startAutoPlay();
    }
  }

  // Start autoplay
  startAutoPlay();

  // Pause on hover
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.addEventListener('mouseenter', () => {
    isAutoPlaying = false;
    stopAutoPlay();
  });

  carouselContainer.addEventListener('mouseleave', () => {
    isAutoPlaying = true;
    startAutoPlay();
  });

  // Touch event handling
  let touchStartX = 0;
  let touchEndX = 0;

  carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isAutoPlaying = false;
    stopAutoPlay();
  }, { passive: true });

  carouselContainer.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
  }, { passive: true });

  carouselContainer.addEventListener('touchend', () => {
    const difference = touchStartX - touchEndX;
    if (Math.abs(difference) > 50) { // Minimum swipe distance
      if (difference > 0) {
        moveCarousel(1); // Swipe left
      } else {
        moveCarousel(-1); // Swipe right
      }
    }
    isAutoPlaying = true;
    startAutoPlay();
  });
});

// Function to move carousel
function moveCarousel(direction) {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.project-card');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  // Calculate number of visible slides based on screen width
  let slidesPerView = 3;
  if (window.innerWidth <= 1200) slidesPerView = 2;
  if (window.innerWidth <= 768) slidesPerView = 1;

  // Calculate maximum slide position (add 1 to allow seeing the last slide)
  const maxSlide = (slides.length - slidesPerView) + 1;
  
  // Update current slide with bounds checking
  const newPosition = currentSlide + direction;
  
  if (newPosition >= 0 && newPosition <= maxSlide) {
    currentSlide = newPosition;
  }
  
  // Calculate slide width based on visible slides
  const slideWidth = (100 / slidesPerView)+2;
  
  // Update track position
  track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
  
  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === Math.floor(currentSlide));
  });
}