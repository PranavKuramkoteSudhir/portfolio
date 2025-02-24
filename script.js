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
