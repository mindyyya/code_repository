
// 1. Web Component Definition for displaying a lotto set
class LottoSet extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['numbers'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'numbers' && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const numbersAttr = this.getAttribute('numbers');
    if (!numbersAttr) return;

    let numbers = [];
    try {
      numbers = JSON.parse(numbersAttr);
    } catch (e) {
      console.error('Failed to parse numbers attribute:', e);
      return;
    }
    
    this.shadowRoot.innerHTML = ''; // Clear previous content

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        margin-bottom: 1rem;
      }
      .lotto-set-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        padding: 1.5rem;
        border-radius: 12px;
        background: var(--lotto-set-bg, rgba(255, 255, 255, 0.8));
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        border: 1px solid var(--lotto-set-border, rgba(0,0,0,0.05));
        animation: slideIn 0.5s ease-out forwards;
        transition: background-color 0.3s ease, border-color 0.3s ease;
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .lotto-ball {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 1.1rem;
        color: white;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15), inset 0 -3px 0 rgba(0,0,0,0.2);
        animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        opacity: 0;
      }
      @keyframes pop {
        from { opacity: 0; transform: scale(0.5); }
        to { opacity: 1; transform: scale(1); }
      }
    `;

    const container = document.createElement('div');
    container.classList.add('lotto-set-container');

    numbers.forEach((number, index) => {
      const ball = document.createElement('div');
      ball.classList.add('lotto-ball');
      ball.textContent = number;
      ball.style.animationDelay = `${index * 0.1}s`;
      
      // Color ranges based on standard lotto ball colors
      if (number <= 10) ball.style.backgroundColor = '#f1c40f'; // Yellow
      else if (number <= 20) ball.style.backgroundColor = '#3498db'; // Blue
      else if (number <= 30) ball.style.backgroundColor = '#e74c3c'; // Red
      else if (number <= 40) ball.style.backgroundColor = '#95a5a6'; // Gray
      else ball.style.backgroundColor = '#2ecc71'; // Green
      
      container.appendChild(ball);
    });

    this.shadowRoot.append(style, container);
  }
}

if (!customElements.get('lotto-set')) {
    customElements.define('lotto-set', LottoSet);
}

// 2. Lotto Number Generation Logic
function generateLottoSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function generateFiveSets() {
    const allSets = [];
    for (let i = 0; i < 5; i++) {
        allSets.push(generateLottoSet());
    }
    return allSets;
}

// 3. Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn');
    const resultContainer = document.getElementById('result-container');
    const themeToggle = document.getElementById('theme-toggle');

    if (!drawBtn || !resultContainer || !themeToggle) {
        console.error('Required elements not found');
        return;
    }

    // Theme logic
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        console.log('Theme toggled. Dark mode:', isDark);
    });

    drawBtn.addEventListener('click', () => {
        // Simple scale effect on click
        drawBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            drawBtn.style.transform = '';
        }, 100);

        const fiveSets = generateFiveSets();
        displayNumbers(fiveSets);
    });

    function displayNumbers(allSets) {
        resultContainer.innerHTML = ''; // Clear previous results
        allSets.forEach((numberSet, index) => {
            const lottoSetElement = document.createElement('lotto-set');
            // Stagger the appearance of each set
            lottoSetElement.style.animationDelay = `${index * 0.2}s`;
            lottoSetElement.setAttribute('numbers', JSON.stringify(numberSet));
            resultContainer.appendChild(lottoSetElement);
        });
    }
});
